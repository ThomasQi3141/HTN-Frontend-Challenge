import React from "react";
import { TEvent } from "../__types/index";
import MenuButton from "./MenuButton"; // Assuming you have this component

const EventCard = ({ event }: { event: TEvent }) => {
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

      {event.speakers.length > 0 && (
        <p className="text-text mt-2">
          🎤 Speakers: {event.speakers.map((s) => s.name).join(", ")}
        </p>
      )}

      <div className="flex-grow"></div>
      {/* View event button (redirect to event) */}
      <div className="mt-4 flex">
        <MenuButton onClick={() => {}}>View Event</MenuButton>
      </div>
    </div>
  );
};

export default EventCard;
