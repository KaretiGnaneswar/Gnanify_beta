import React, { useState, useEffect } from "react";

const Timetable = () => {
  const [tasks, setTasks] = useState([]);
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");

  // ✅ Load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("gate_timetable");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // ✅ Save data whenever tasks change
  useEffect(() => {
    localStorage.setItem("gate_timetable", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!subject || !date) return;
    const newTask = { id: Date.now(), subject, date, done: false };
    setTasks((prev) => [...prev, newTask]);
    setSubject("");
    setDate("");
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-900/70 backdrop-blur-lg rounded-xl border border-white/10 text-white shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-orange-400 text-center">
        📘 GATE Preparation Timetable
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject or topic"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 border border-white/20 text-white focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-orange-400 text-black font-semibold rounded-lg hover:bg-orange-500"
        >
          ➕ Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-400 text-center">No subjects added yet.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between bg-gray-800/80 border border-white/10 rounded-lg p-3"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleDone(t.id)}
                  className="h-5 w-5 accent-orange-400"
                />
                <div>
                  <div
                    className={`font-semibold ${
                      t.done ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {t.subject}
                  </div>
                  <div className="text-sm text-gray-400">{t.date}</div>
                </div>
              </div>
              <button
                onClick={() => deleteTask(t.id)}
                className="text-red-400 hover:text-red-500"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Timetable;
