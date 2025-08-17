import { useEffect, useState } from "react";
import "../../styles/Workshops.css";

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/workshops")
      .then((res) => res.json())
      .then((data) => setWorkshops(data))
      .catch((err) => console.error("Error fetching workshops:", err));
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="workshops-container">
      <h2 className="workshops-title">Workshops</h2>
      <div className="workshops-list">
        {workshops.map((workshop, index) => (
          <div
            key={workshop._id}
            onClick={() => toggleExpand(index)}
            className={`workshop-card ${expandedIndex === index ? "expanded" : "collapsed"}`}
          >
            <h3 className="workshop-name">
              {workshop.name}
            </h3>
            <p className="workshop-date">
              {new Date(workshop.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <div className="workshop-description">
              {workshop.description}
              {workshop.instructor && (
                <p className="instructor">Instructor: {workshop.instructor}</p>
              )}
              {workshop.requirements && (
                <p className="requirements">Requirements: {workshop.requirements}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}