"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TEvent } from "../../__types/index";
import { useGetEventQuery, useGetEventsQuery } from "../../__store/api";
import MenuButton from "../../__components/MenuButton";
import Navbar from "@/app/__components/Navbar";
import { useUser } from "@auth0/nextjs-auth0/client";

// View event page (after click into an event)
const EventPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const params = useParams();
  // Get the event ID from the URL params to allow user bookmarking
  const eventId = Array.isArray(params.eventId)
    ? params.eventId[0]
    : params.eventId;
  const numericEventId = eventId ? parseInt(eventId, 10) : undefined;

  // Event data fetched from endpoint
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

  // useEffects to fetch event data on change
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

  // Check if data is available
  if (!event) {
    return <div>Loading...</div>;
  }

  // Disallow users to view private events directly via URL if not signed in
  if (!user && event.permission === "private") {
    return (
      <div className="flex justify-center items-center min-h-screen text-text">
        Please login to view this event.
      </div>
    );
  }

  return (
    <div className="p-4 mt-8 max-w-4xl mx-auto space-y-6">
      {/* Navigation Bar */}
      <Navbar />
      <h1 className="text-3xl font-bold text-accent">{event.name}</h1>
      <p className="text-text opacity-80">{event.description}</p>

      {/* Event time (start to end, no dates) */}
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
      {/* Event Type & Speakers */}
      <p className="text-text">🔖 Type: {event.event_type}</p>

      {event.speakers.length > 0 && (
        <p className="text-text">
          🎤 Speakers: {event.speakers.map((s) => s.name).join(", ")}
        </p>
      )}
      {/* Related Events */}
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

      {/* Join Event Button (public/private URL depending on user status) */}
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
