import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // adjust path
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import getApiBase from '../../utils/apiBase';

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toast, setToast] = useState({ message: "", type: "info" });

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const apiBase = getApiBase();
      const response = await fetch(`${apiBase}/api/users`);
      const data = await response.json();
      console.log("Fetched users:", data);

      if (!Array.isArray(data)) {
        console.error("Expected an array but got:", data);
        return; // stop if data is not an array
      }

      // Add an "active" field if not present
      const usersWithStatus = data.map(u => ({
        ...u,
        active: u.active !== undefined ? u.active : true,
        tasks: Array.isArray(u.tasks) ? u.tasks : [],
        Batch: u.Batch ?? u.batch,
        Skills: u.Skills ?? u.skills,
        PreferedLanguage: u.PreferedLanguage ?? u.preferedLanguage
      }));

      setUsers(usersWithStatus);
    } catch (error) {
      console.error("Error fetching users:", error);
      setToast({ message: "Failed to load users.", type: "error" });
    }
  };

  fetchUsers();
}, []);


  // Send email to individual user via API
  const handleSendMail = async (user) => {
    if (!window.confirm(`Send welcome email to ${user.name} (${user.email})?`)) {
      return;
    }

    try {
      const apiBase = getApiBase();
      const response = await fetch(`${apiBase}/api/email/send-individual`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id })
      });

      const data = await response.json().catch(() => ({}));
      
      if (data.success) {
        setToast({ message: data.message || "Email sent successfully.", type: "success" });
      } else {
        setToast({ message: data.message || "Failed to send email.", type: "error" });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setToast({ message: "Failed to send email. Please try again.", type: "error" });
    }
  };

const toggleActive = async (userId, currentStatus) => {
  try {
  const apiBase = getApiBase();
  const response = await fetch(`${apiBase}/api/users/${userId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !currentStatus }),
    });
    const updatedUser = await response.json();

    setUsers(users.map(u => u._id === userId ? updatedUser : u));
  } catch (err) {
    console.error("Failed to update status", err);
    setToast({ message: "Failed to update status.", type: "error" });
  }
};

// Assign Task and save in DB
const [taskModal, setTaskModal] = useState({ open: false, user: null, task: "" });

const openTaskModal = (user) => {
  setTaskModal({ open: true, user, task: "", editIndex: undefined });
};

  const closeTaskModal = () => {
    setTaskModal({ open: false, user: null, task: "" });
  };

  // Submit edited task
const submitTask = async () => {
  const { user, task, editIndex } = taskModal;
  if (!task) return;

  try {
    let updatedUser;

    if (!user.tasks) user.tasks = []; // ensure tasks array exists
    const newTasks = [...user.tasks];

    if (editIndex !== undefined) {
      // editing existing task
      newTasks[editIndex] = task;
  const apiBase = getApiBase();
  const response = await fetch(`${apiBase}/api/users/${user._id}/updateTasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: newTasks }),
      });
      updatedUser = await response.json();
    } else {
      // adding new task
  const apiBase = getApiBase();
  const response = await fetch(`${apiBase}/api/users/${user._id}/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
      updatedUser = await response.json();
    }

    setUsers(users.map(u => u._id === user._id ? updatedUser : u));
    closeTaskModal();
  } catch (err) {
    console.error("Failed to submit task", err);
    setToast({ message: "Failed to submit task.", type: "error" });
  }
};

// Delete task
const deleteTask = async (user, taskIndex) => {
  try {
    const newTasks = user.tasks.filter((_, idx) => idx !== taskIndex);
  const apiBase = getApiBase();
  const response = await fetch(`${apiBase}/api/users/${user._id}/updateTasks`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks: newTasks }),
    });
    const updatedUser = await response.json();
    setUsers(users.map(u => u._id === user._id ? updatedUser : u));
  } catch (err) {
    console.error("Failed to delete task", err);
    setToast({ message: "Failed to delete task.", type: "error" });
  }
};


  // Open edit modal
const openEditTaskModal = (user, taskIndex) => {
  setTaskModal({ open: true, user, task: user.tasks[taskIndex], editIndex: taskIndex });
};


  return (
    <div className="min-h-screen bg-gray-900 text-white w-full">
      <Navbar />
      <div className="p-8">
        {toast.message && (
          <div
            className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium border ${
              toast.type === "success"
                ? "bg-green-500/10 text-green-300 border-green-500/30"
                : toast.type === "error"
                ? "bg-red-500/10 text-red-300 border-red-500/30"
                : "bg-blue-500/10 text-blue-300 border-blue-500/30"
            }`}
          >
            {toast.message}
          </div>
        )}
        <div className="flex mb-6 justify-between">
          <button
            onClick={() => navigate("/admin")}
            className="mb-6 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Home
          </button>

          <button
              onClick={async () => {
                const activeUsers = users.filter(u => u.active);
                if (activeUsers.length === 0) {
                  return setToast({ message: "No active users to send mail to.", type: "info" });
                }
                
                if (!window.confirm(`Send welcome email to all ${activeUsers.length} active users?`)) {
                  return;
                }

                try {
                  const apiBase = getApiBase();
                  const response = await fetch(`${apiBase}/api/email/send-bulk`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                  });

                  const data = await response.json().catch(() => ({}));
                  
                  if (data.success) {
                    setToast({ message: data.message || "Bulk email sent.", type: "success" });
                  } else {
                    setToast({ message: data.message || "Failed to send bulk email.", type: "error" });
                  }
                } catch (error) {
                  console.error("Error sending bulk email:", error);
                  setToast({ message: "Failed to send bulk email. Please try again.", type: "error" });
                }
              }}
              className="mb-6 ml-4 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Send Mail to All
            </button>

        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, or reg no"
              className="w-full rounded bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Registered Users</h1>

        {users.length === 0 ? (
          <p className="text-gray-400">No users registered yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users
              .filter((user) => {
                const q = query.trim().toLowerCase();
                const matchesQuery =
                  !q ||
                  user.name?.toLowerCase().includes(q) ||
                  user.email?.toLowerCase().includes(q) ||
                  user.reg_no?.toLowerCase().includes(q);
                const matchesStatus =
                  statusFilter === "all" ||
                  (statusFilter === "active" ? user.active : !user.active);
                return matchesQuery && matchesStatus;
              })
              .map((user) => (
              <div
                key={user._id}
                className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-gray-400">Email: {user.email}</p>
                <p className="text-gray-400">Phone: {user.phone}</p>
                <p className="text-gray-400">Department: {user.password}</p>
                <p className="text-gray-400">Batch: {user.Batch ?? user.batch}</p>
                <p className="text-gray-400">Skills: {user.Skills ?? user.skills}</p>
                <p className="text-gray-400">Preferred Language: {user.PreferedLanguage ?? user.preferedLanguage}</p>
                <p className="text-gray-400">Reg No: {user.reg_no}</p>

                
                  {/* Display assigned tasks */}
                  <div className="mt-2">
                    <h3 className="font-semibold text-gray-300">Tasks for {user.name}:</h3>
                    {user.tasks && user.tasks.length > 0 ? (
                      <ul className="list-decimal list-inside text-gray-400 space-y-1">
                        {user.tasks.map((task, index) => (
                          <li key={index} className="flex justify-between items-start">
                            {/* Task text */}
                            <span className="w-4 text-gray-500 font-semibold">{index + 1}.</span>

                            <span className="whitespace-pre-wrap break-words flex-1">{task}</span>

                            {/* Action icons */}
                            <div className="flex gap-2 ml-4 mt-1">
                              {/* Edit Task */}
                              <button
                                onClick={() => openEditTaskModal(user, index)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <FaEdit size={16} />
                              </button>

                              {/* Delete Task */}
                              <button
                                onClick={() => deleteTask(user, index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FaTrash size={16} />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">No tasks assigned</p>
                    )}
                  </div>



                <div className="flex mt-4 justify-between">
                  {/* Send Mail Button */}
                  <button
                    onClick={() => handleSendMail(user)}
                     disabled={!user.active}
                     className={`px-4 py-2 rounded ${
                      user.active
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Send Mail
                  </button>

                  <button
                      onClick={() => toggleActive(user._id, user.active)}
                      className={`px-4 py-2 rounded ${user.active ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                      >
                      {user.active ? "Active" : "Inactive"}
                  </button>

                 {/* With this */}
                <button
                  onClick={() => openTaskModal(user)}
                   disabled={!user.active}
                  className={`px-4 py-2 rounded ${
                    user.active
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                              >
                  Assign Task
                </button>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
      {taskModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-2xl h-2/3">
            <h3 className="text-white font-bold mb-4">Assign Task to {taskModal.user.name}</h3>
            <textarea
              type="text"
              className="w-full p-2 mb-4 rounded text-white bg-gray-700 h-2/3 border border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Enter task"
              value={taskModal.task}
              onChange={(e) => setTaskModal({ ...taskModal, task: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeTaskModal}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white"
              >
                Cancel
              </button>

              <button
                onClick={submitTask}
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 text-white"
              >
                {taskModal.editIndex !== undefined ? "Update" : "Assign"}
              </button>

            </div>
          </div>
        </div>
      )}
    
      </div>
    </div>

    
  );
}


