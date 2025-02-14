"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TEvent } from "../../__types/index";
import { useGetEventQuery, useGetEventsQuery } from "../../__store/api";
import MenuButton from "../../__components/MenuButton";
import Navbar from "@/app/__components/Navbar";
import { useUser } from "@auth0/nextjs-auth0/client";

const EventPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const params = useParams();
  const eventId = Array.isArray(params.eventId)
    ? params.eventId[0]
    : params.eventId;
  const numericEventId = eventId ? parseInt(eventId, 10) : undefined;

  const {
    data: eventData,
    error,
    isLoading,
  } = useGetEventQuery(numericEventId!, {
    skip: !numericEventId,
  });
  const { data: eventsData } = useGetEventsQuery();

  const [event, setEvent] = useState<TEvent>();
  const [relatedEvents, setRelatedEvents] = useState<TEvent[]>([]);

  useEffect(() => {
    if (eventData) {
      setEvent(eventData);
    }
  }, [eventData]);

  useEffect(() => {
    if (event && eventsData) {
      setRelatedEvents(
        eventsData.filter((e) => event.related_events.includes(e.id))
      );
    }
  }, [event, eventsData]);

  if (!event) {
    return <div>Loading...</div>;
  }

  if (!user && event.permission === "private") {
    return (
      <div className="flex justify-center items-center min-h-screen text-text">
        Please login to view this event.
      </div>
    );
  }

  return (
    <div className="p-4 mt-8 max-w-4xl mx-auto space-y-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-accent">{event.name}</h1>
      <p className="text-text opacity-80">{event.description}</p>

      <p className="text-text opacity-80">
        📅{" "}
        {new Date(event.start_time).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}{" "}
        -{" "}
        {new Date(event.end_time).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </p>

      <p className="text-text">🔖 Type: {event.event_type}</p>

      {event.speakers.length > 0 && (
        <p className="text-text">
          🎤 Speakers: {event.speakers.map((s) => s.name).join(", ")}
        </p>
      )}

      {relatedEvents.length > 0 && (
        <div>
          <p className="text-text font-semibold">🔗 Related Events:</p>
          <ul className="list-disc list-inside text-text opacity-80">
            {relatedEvents.map((relatedEvent) => (
              <li
                key={relatedEvent.id}
                className="cursor-pointer text-primary hover:underline"
                onClick={() => router.push(`/events/${relatedEvent.id}`)}>
                {relatedEvent.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(user ? event.private_url : event.public_url) && (
        <div className="flex justify-start">
          <MenuButton
            onClick={() =>
              window.open(user ? event.private_url : event.public_url, "_blank")
            }>
            Join Event
          </MenuButton>
        </div>
      )}
    </div>
  );
};

export default EventPage;
