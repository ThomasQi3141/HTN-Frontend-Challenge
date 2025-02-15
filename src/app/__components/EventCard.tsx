import React from "react";
import { TEvent } from "../__types/index";
import { useRouter } from "next/navigation";
import MenuButton from "./MenuButton";

// Card component for each event to be rendered on the events page
const EventCard = ({ event }: { event: TEvent }) => {
  const router = useRouter();

  // Function to map event type to a more readable format
  const getReadableEventType = (eventType: string) => {
    const eventTypeMap: { [key: string]: string } = {
      workshop: "Workshop",
      activity: "Activity",
      tech_talk: "Tech Talk",
    };
    return eventTypeMap[eventType] || eventType;
  };

  return (
    <div
      key={event.id}
      className="w-full max-w-sm min-w-0 mx-auto bg-bgSecondary shadow-xl rounded-lg p-6 border border-primary flex flex-col">
      <h2 className="text-xl font-semibold text-accent">{event.name}</h2>

      {/* Event time (start to end, no dates) */}
      <p className="text-text opacity-80">
        📅{" "}
        {new Date(event.start_time).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}{" "}
        -{" "}
        {new Date(event.end_time).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </p>

      {/* Event type */}
      <p className="text-text mt-2">
        📌 {getReadableEventType(event.event_type)}
      </p>

      {event.speakers.length > 0 && (
        <p className="text-text mt-2">
          🎤 Speakers: {event.speakers.map((s) => s.name).join(", ")}
        </p>
      )}

      <div className="flex-grow"></div>
      {/* View event button (redirect to event) */}
      <div className="mt-4 flex">
        <MenuButton
          onClick={() => {
            router.push(`/events/${event.id}`);
          }}>
          View Event
        </MenuButton>
      </div>
    </div>
  );
};

export default EventCard;
