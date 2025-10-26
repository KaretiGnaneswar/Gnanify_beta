import { useState } from "react";
import { FiEdit3, FiTrash2, FiPlus } from "react-icons/fi";

export default function ProjectsSection({ profile, setProfile }) {
  const [editIndex, setEditIndex] = useState(-1);
  const [newProject, setNewProject] = useState({
    name: "",
    link: "",
    description: "",
    technologies: "",
  });

  const projects = profile.projects || [];

  const handleSave = () => {
    const updated = [...projects];
    if (editIndex >= 0) {
      updated[editIndex] = newProject;
    } else {
      updated.push(newProject);
    }
    setProfile((p) => ({ ...p, projects: updated }));
    setNewProject({ name: "", link: "", description: "", technologies: "" });
    setEditIndex(-1);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewProject(projects[index]);
  };

  const handleDelete = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProfile((p) => ({ ...p, projects: updated }));
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Projects</h2>
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
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              placeholder="Project Name"
              className="inp"
            />
            <input
              value={newProject.link}
              onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              placeholder="Project Link (optional)"
              className="inp"
            />
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Description"
              className="inp"
            />
            <input
              value={newProject.technologies}
              onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
              placeholder="Technologies used (comma separated)"
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
            {projects.length === 0 && <div className="text-gray-400">No projects added yet.</div>}
            {projects.map((proj, index) => (
              <div key={index} className="border-b border-gray-700 pb-2 flex justify-between">
                <div>
                  <div className="text-white font-semibold">{proj.name}</div>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm">
                      {proj.link}
                    </a>
                  )}
                  <div className="text-neutral-300 text-sm">{proj.description}</div>
                  <div className="text-gray-400 text-xs">{proj.technologies}</div>
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
