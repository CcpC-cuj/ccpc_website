import React from "react";

const events = [
  {
    title: "Event 1",
    image: "/path/to/image1.jpg",
    date: "January 2025",
    blogLink: "/blog/event1"
  },
  {
    title: "Event 2",
    image: "/path/to/image2.jpg",
    date: "December 2024",
    blogLink: "/blog/event2"
  },
  {
    title: "Event 3",
    image: "/path/to/image3.jpg",
    date: "November 2024",
    blogLink: "/blog/event3"
  }
];

const Events = () => {
  return (
    <div className="events-section mt-12 px-4 lg:px-16">
      <h2 className="text-3xl font-semibold text-yellow-500 mb-8 font-mono">Past Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div key={index} className="event-card p-6 bg-white/20 backdrop-blur-md rounded-lg text-gray-300 shadow-lg border border-gray-500">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-lg" />
            <h3 className="text-2xl font-semibold text-yellow-500 mt-4">{event.title}</h3>
            <p className="text-sm text-gray-400 mt-2">{event.date}</p>
            <a href={event.blogLink} className="text-yellow-500 mt-4 block">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
