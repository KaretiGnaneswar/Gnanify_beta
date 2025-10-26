import React from "react";

// Generate dummy contribution data for a year
const generateDummyContributions = () => {
  const contributions = [];
  const daysInYear = 365;
  for (let i = 0; i < daysInYear; i++) {
    contributions.push(Math.floor(Math.random() * 5)); // 0-4 intensity
  }
  return contributions;
};

// Map contributions to color intensity
const getColor = (value) => {
  switch (value) {
    case 0:
      return "bg-gray-800"; // no contribution
    case 1:
      return "bg-green-200";
    case 2:
      return "bg-green-300";
    case 3:
      return "bg-green-400";
    case 4:
      return "bg-green-500";
    default:
      return "bg-gray-800";
  }
};

// Get week day for first day of year
const getWeekDay = (year) => new Date(year, 0, 1).getDay();

export default function ProfileContribution() {
  const contributions = generateDummyContributions();
  const year = new Date().getFullYear();
  const startWeekDay = getWeekDay(year);

  // Split into weeks (7 days each)
  const weeks = [];
  let week = new Array(startWeekDay).fill(0); // start empty for offset
  contributions.forEach((c, idx) => {
    week.push(c);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length > 0) weeks.push([...week, ...new Array(7 - week.length).fill(0)]);

  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="card p-4">
      <h2 className="text-lg font-semibold text-white mb-3">Contribution Graph</h2>
      <div className="flex items-start gap-2 overflow-x-auto">
        {weeks.map((days, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-0.5">
            {days.map((day, dayIdx) => (
              <div
                key={dayIdx}
                className={`w-3 h-3 rounded ${getColor(day)}`}
                title={`Day ${weekIdx * 7 + dayIdx + 1}: ${day} contributions`}
              ></div>
            ))}
          </div>
        ))}
      </div>

      {/* Month labels */}
      <div className="flex justify-between mt-2 text-gray-400 text-xs px-1">
        {monthLabels.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
}
