import { useEffect, useState } from "react";
import "../../styles/PastEvent.css";

export default function Past() {
  const [events, setEvents] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/past-events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="past-events-container">
      <h2 className="past-events-title">Past Events</h2>
      <div className="events-list">
        {events.map((event, index) => (
          <div
            key={event._id}
            onClick={() => toggleExpand(index)}
            className={`event-card ${expandedIndex === index ? "expanded" : "collapsed"}`}
          >
            <h3 className="event-name">
              {event.name}
            </h3>
            <p className="event-date">
              {new Date(event.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <div className="event-description">
              {event.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}