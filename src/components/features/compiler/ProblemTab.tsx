import { useState } from "react";

export default function ProblemTabs({ description }) {
  const [active, setActive] = useState("description");
  const tabs = ["description", "discussion", "submissions"];

  return (
    <div className="flex flex-col bg-gray-800 p-4 rounded-md mb-2">
      <div className="flex gap-4 border-b border-gray-700 mb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-3 py-1 font-semibold ${
              active === tab ? "border-b-2 border-blue-500" : "text-gray-400"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="text-gray-300">
        {active === "description" && <p>{description}</p>}
        {active === "discussion" && <p>Discussion area (coming soon)</p>}
        {active === "submissions" && <p>Submissions list (coming soon)</p>}
      </div>
    </div>
  );
}
