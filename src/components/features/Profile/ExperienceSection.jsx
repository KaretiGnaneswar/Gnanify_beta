import { useState } from "react";
import { FiEdit3, FiTrash2, FiPlus, FiSave, FiX } from "react-icons/fi";

export default function ExperienceSection({ profile, setProfile }) {
  const [editIndex, setEditIndex] = useState(-1);
  const [newExp, setNewExp] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const experiences = profile.experiences || [];

  const handleSave = () => {
    const updated = [...experiences];
    if (editIndex >= 0) {
      updated[editIndex] = newExp;
    } else {
      updated.push(newExp);
    }
    setProfile((p) => ({ ...p, experiences: updated }));
    setNewExp({ title: "", company: "", startDate: "", endDate: "", description: "" });
    setEditIndex(-1);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewExp(experiences[index]);
  };

  const handleDelete = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setProfile((p) => ({ ...p, experiences: updated }));
  };

  return (
    <div className="rounded-2xl shadow-lg p-6 bg-white/90 dark:bg-neutral-900/70 border border-neutral-200 dark:border-white/10 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white tracking-wide">Experience</h2>
        <button
          onClick={() => setEditIndex(-2)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500 transition"
        >
          <FiPlus /> Add
        </button>
      </div>

      {(editIndex >= 0 || editIndex === -2) ? (
        <div className="space-y-4 animate-fadeIn">
          <input
            value={newExp.title}
            onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
            placeholder="Job Title"
            className="inp"
          />
          <input
            value={newExp.company}
            onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
            placeholder="Company"
            className="inp"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              value={newExp.startDate}
              onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })}
              placeholder="Start Date"
              className="inp"
            />
            <input
              value={newExp.endDate}
              onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })}
              placeholder="End Date"
              className="inp"
            />
          </div>
          <textarea
            value={newExp.description}
            onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
            placeholder="Description"
            className="inp"
            rows={3}
          />

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500 transition"
            >
              <FiSave /> Save
            </button>
            <button
              onClick={() => setEditIndex(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <FiX /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {experiences.length === 0 && (
            <div className="text-neutral-600 dark:text-gray-400 italic">No experience added yet.</div>
          )}

          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group border border-neutral-200 dark:border-white/10 rounded-xl p-4 hover:shadow-md hover:border-orange-400/60 transition-all bg-white/60 dark:bg-neutral-800/60"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-semibold text-neutral-900 dark:text-white">{exp.title}</div>
                  <div className="text-orange-500 dark:text-orange-400 font-medium text-sm">{exp.company}</div>
                  <div className="text-neutral-500 dark:text-neutral-400 text-xs mt-1">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </div>
                  <div className="text-neutral-700 dark:text-neutral-300 text-sm mt-2 leading-relaxed">
                    {exp.description}
                  </div>
                </div>

                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-neutral-500 hover:text-orange-500 transition"
                  >
                    <FiEdit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
