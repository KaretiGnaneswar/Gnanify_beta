import { useState } from "react";
import { FiEdit3, FiTrash2, FiPlus } from "react-icons/fi";

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
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Experience</h2>
          <button
            onClick={() => setEditIndex(-2)} // -2 means adding new
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-800 border border-white/10 text-white hover:bg-neutral-700"
          >
            <FiPlus /> Add
          </button>
        </div>

        {(editIndex >= 0 || editIndex === -2) ? (
          <div className="space-y-3">
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
            <textarea
              value={newExp.description}
              onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
              placeholder="Description"
              className="inp"
            />
            <div className="flex gap-2">
              <button onClick={handleSave} className="px-4 py-2 bg-orange-400 rounded-md text-black font-semibold">
                Save
              </button>
              <button onClick={() => setEditIndex(-1)} className="px-4 py-2 bg-gray-700 rounded-md text-white">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {experiences.length === 0 && <div className="text-gray-400">No experience added yet.</div>}
            {experiences.map((exp, index) => (
              <div key={index} className="border-b border-gray-700 pb-2 flex justify-between">
                <div>
                  <div className="text-white font-semibold">{exp.title}</div>
                  <div className="text-gray-400 text-sm">{exp.company}</div>
                  <div className="text-gray-500 text-xs">{exp.startDate} - {exp.endDate || "Present"}</div>
                  <div className="text-neutral-300 text-sm">{exp.description}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(index)} className="text-gray-400 hover:text-white">
                    <FiEdit3 />
                  </button>
                  <button onClick={() => handleDelete(index)} className="text-red-400 hover:text-red-500">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
