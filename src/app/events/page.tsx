"use client";

import { useEffect, useState } from "react";
import { useGetEventsQuery } from "../__store/api";
import { TEvent } from "../__types/index";
import { useRouter } from "next/navigation";
import EventCard from "../__components/EventCard";
import EventsSideBar from "../__components/EventsSidebar";
import EventsNavbar from "../__components/EventsNavbar"; // ✅ Updated name

const eventTypes = ["All", "workshop", "activity", "tech_talk"];
const sortOptions = ["Ascending", "Descending"];

const Events = () => {
  const router = useRouter();
  const { data: eventData, error, isLoading } = useGetEventsQuery();
  const [events, setEvents] = useState<TEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortOrder, setSortOrder] = useState("Ascending");

  useEffect(() => {
    if (eventData) {
      setEvents(eventData);
    }
  }, [eventData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-text">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-accent">
        Failed to load events.
      </div>
    );
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "All" || event.event_type === selectedType;
    return matchesSearch && matchesType;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) =>
    sortOrder === "Ascending"
      ? a.start_time - b.start_time
      : b.start_time - a.start_time
  );

  return (
    <div className="flex min-h-screen bg-bgPrimary text-text">
      {/* Mobile Navbar (Only Visible When Sidebar is Hidden) */}
      <EventsNavbar />

      {/* Sidebar (hidden on mobile) */}
      <EventsSideBar />

      {/* Events List Section */}
      <main className="flex-1 p-8 bg-bgPrimary pt-16 md:pt-0">
        {/* Top Bar: Title + Search Bar + Filters */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4 mt-4">
          <h1 className="text-3xl font-bold text-primary">Events</h1>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full md:w-64 bg-bgSecondary border border-primary rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-accent"
          />

          {/* Sort & Filter Section */}
          <div className="flex gap-4">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 bg-bgSecondary border border-primary rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-accent">
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option} Start Time
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-bgSecondary border border-primary rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-accent">
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() +
                    type.slice(1).replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Event Cards */}
        {sortedEvents.length === 0 ? (
          <p className="text-text opacity-70">No events match your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Events;
