import "./TimelineSelector.css";

const decades = [1950, 1960, 1970, 1980, 1990, 2000];

function TimelineSelector({ selectedDecade = 1970, onSelectDecade }) {
  const handleClick = (decade) => {
    if (onSelectDecade) {
      onSelectDecade(decade);
    }
  };

  return (
    <div className="timeline-selector">
      <div className="timeline-line"></div>

      {decades.map((decade) => (
        <button
          key={decade}
          type="button"
          className={`timeline-item ${
            selectedDecade === decade ? "active" : ""
          }`}
          onClick={() => handleClick(decade)}
        >
          <span className="timeline-dot"></span>
          <span className="timeline-year">{decade}</span>
        </button>
      ))}
    </div>
  );
}

export default TimelineSelector;