import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, push, get, remove } from "firebase/database";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const PROJECT = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    skills: "",
    deployedLink: "",
    repositoryLink: "",
    isOngoing: false,
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(null); // For toggling descriptions
  const auth = getAuth();
  const database = getDatabase();

  // Fetch projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("No user logged in.");
          return;
        }

        const projectsRef = ref(database, `users/${user.uid}/projects`);
        const snapshot = await get(projectsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const projectArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setProjects(projectArray);
        } else {
          console.log("No projects found.");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [auth.currentUser, database]);

  // Add or Update Project
  const handleSaveProject = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user logged in.");
      return;
    }

    const projectsRef = ref(database, `users/${user.uid}/projects`);
    if (editIndex !== null) {
      // Update an existing project
      const projectId = projects[editIndex].id;
      const projectRef = ref(database, `users/${user.uid}/projects/${projectId}`);
      await set(projectRef, newProject);
      const updatedProjects = [...projects];
      updatedProjects[editIndex] = { id: projectId, ...newProject };
      setProjects(updatedProjects);
      setEditIndex(null);
    } else {
      // Add a new project
      const newProjectRef = push(projectsRef);
      await set(newProjectRef, {
        title: newProject.title,
        description: newProject.description,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        skills: newProject.skills,
        deployedLink: newProject.deployedLink,
        repositoryLink: newProject.repositoryLink,
        isOngoing: newProject.isOngoing,
      });
      setProjects([
        ...projects,
        { id: newProjectRef.key, ...newProject },
      ]);
    }

    setNewProject({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      skills: "",
      deployedLink: "",
      repositoryLink: "",
      isOngoing: false,
    });
    setShowForm(false);
  };

  // Edit Project
  const handleEdit = (index) => {
    setEditIndex(index);
    setNewProject(projects[index]);
    setShowForm(true);
  };

  // Delete Project
  const handleDelete = async (index) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user logged in.");
      return;
    }

    const projectId = projects[index].id;
    const projectRef = ref(database, `users/${user.uid}/projects/${projectId}`);
    await remove(projectRef);

    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  // Truncate description to a specific length
  const truncateDescription = (description) => {
    const maxLength = 150;
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  // Toggle description for expanded view
  const toggleDescription = (index) => {
    setExpandedDescription(expandedDescription === index ? null : index);
  };

  return (
    <div className="p-2 lg:p-40 mx-0 lg:mx-6">
      <h2 className="text-xl font-bold mb-4 flex  text-white justify-between items-center">
        Projects
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Project
        </button>
      </h2>

      {showForm && (
        <div className="mb-6">
          <label htmlFor="title" className="text-white font-medium mb-2 block">Title</label>
          <input
            id="title"
            type="text"
            className="border p-2 mb-2 w-full text-black"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />

          <label htmlFor="description" className="text-black font-medium mb-2 block">Description</label>
          <textarea
            id="description"
            className="border p-2 mb-2 w-full text-black"
            placeholder="Description (optional)"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
          />

          <label htmlFor="startDate" className="text-black font-medium mb-2 block">Start Date</label>
          <input
            id="startDate"
            type="date"
            className="border p-2 mb-2 w-full text-black"
            value={newProject.startDate}
            onChange={(e) =>
              setNewProject({ ...newProject, startDate: e.target.value })
            }
          />

          <label htmlFor="endDate" className="text-black font-medium mb-2 block">End Date</label>
          <input
            id="endDate"
            type="date"
            className="border p-2 mb-2 w-full text-black"
            value={newProject.endDate}
            onChange={(e) =>
              setNewProject({ ...newProject, endDate: e.target.value })
            }
            disabled={newProject.isOngoing}
          />

          <label htmlFor="isOngoing" className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isOngoing"
              className="mr-2"
              checked={newProject.isOngoing}
              onChange={() =>
                setNewProject({ ...newProject, isOngoing: !newProject.isOngoing })
              }
            />
            Ongoing Project (Still running)
          </label>

          <label htmlFor="skills" className="text-black font-medium mb-2 block">Skills Gained</label>
          <input
            id="skills"
            type="text"
            className="border p-2 mb-4 w-full text-black"
            placeholder="Skills Gained"
            value={newProject.skills}
            onChange={(e) =>
              setNewProject({ ...newProject, skills: e.target.value })
            }
          />

          <label htmlFor="deployedLink" className="text-black font-medium mb-2 block">Deployed Link (Optional)</label>
          <input
            id="deployedLink"
            type="url"
            className="border p-2 mb-2 w-full text-black"
            placeholder="Deployed URL"
            value={newProject.deployedLink}
            onChange={(e) =>
              setNewProject({ ...newProject, deployedLink: e.target.value })
            }
          />

          <label htmlFor="repositoryLink" className="text-black font-medium mb-2 block">Repository Link (Optional)</label>
          <input
            id="repositoryLink"
            type="url"
            className="border p-2 mb-4 w-full text-black"
            placeholder="GitHub Repository URL"
            value={newProject.repositoryLink}
            onChange={(e) =>
              setNewProject({ ...newProject, repositoryLink: e.target.value })
            }
          />

          <button
            onClick={handleSaveProject}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editIndex !== null ? "Update Project" : "Add Project"}
          </button>
        </div>
      )}

      <div>
        {projects.length === 0 ? (
          <div className="flex justify-center items-center text-white-600">
            <span>No projects found. Add a new project!</span>
          </div>
        ) : (
          projects.map((project, index) => (
            <div
              key={project.id}
              className="border bg-gray-400 p-4 mb-2 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{project.title}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>
                  {expandedDescription === index
                    ? project.description
                    : truncateDescription(project.description)}
                  <button
                    onClick={() => toggleDescription(index)}
                    className="text-black ml-2"
                  >
                    {expandedDescription === index ? "Show Less" : "Show More"}
                  </button>
                </p>
                <p>
                  <strong>Skills:</strong> {project.skills}
                </p>
                <p>
                  <strong>Dates:</strong> {project.startDate} -{" "}
                  {project.isOngoing ? "Ongoing" : project.endDate}
                </p>
                {project.deployedLink && (
                  <p>
                    <strong>Deployed Link:</strong>{" "}
                    <a href={project.deployedLink} target="_blank" rel="noopener noreferrer" className="text-black hover:text-red-500">
                      View Project
                    </a>
                  </p>
                )}
                {project.repositoryLink && (
                  <p>
                    <strong>Repository:</strong>{" "}
                    <a href={project.repositoryLink} target="_blank" rel="noopener noreferrer" className="text-black hover:text-red-500">
                      View Code
                    </a>
                  </p>
                )}
              </div>


              <div className="flex space-x-4">
                <button onClick={() => handleEdit(index)} className="text-white hover:text-red-500">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(index)} className="text-white hover:text-red-500">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PROJECT;
