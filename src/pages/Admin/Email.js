import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import getApiBase from '../../utils/apiBase';

export default function Email() {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [plainText, setPlainText] = useState("");
  const [emailType, setEmailType] = useState("custom"); // Let admin choose the type
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [emailLogs, setEmailLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("compose"); // "compose" or "logs"
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("active");
  const [selectedLog, setSelectedLog] = useState(null); // For viewing email content

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
    fetchEmailLogs();
    
    // If navigated from user page with preselected user, select them
    if (location.state?.preselectedUserId) {
      setSelectedUserIds([location.state.preselectedUserId]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      const apiBase = getApiBase();
      const response = await fetch(`${apiBase}/api/users`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setToast({ message: "Failed to load users.", type: "error" });
    }
  };

  const fetchEmailLogs = async () => {
    setLogsLoading(true);
    try {
      const apiBase = getApiBase();
      const response = await fetch(`${apiBase}/api/email/logs`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setEmailLogs(data);
      }
    } catch (error) {
      console.error("Error fetching email logs:", error);
    } finally {
      setLogsLoading(false);
    }
  };

  // Helper to get user names from IDs
  const getUserNames = (userIds) => {
    if (!Array.isArray(userIds) || userIds.length === 0) return "No users";
    const names = userIds
      .map((id) => {
        const user = users.find((u) => u._id === id);
        return user ? user.name : "Unknown";
      })
      .slice(0, 3); // Show first 3 names
    const more = userIds.length > 3 ? ` +${userIds.length - 3} more` : "";
    return names.join(", ") + more;
  };

  const filteredUsers = users.filter((user) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      user.name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q);
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" ? user.active : !user.active);
    return matchesSearch && matchesStatus;
  });

  const handleUserToggle = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map((u) => u._id));
    }
  };

  const handleSendEmail = async () => {
    if (!subject.trim()) {
      setToast({ message: "Please enter a subject.", type: "error" });
      return;
    }

    if (!htmlContent.trim() && !plainText.trim()) {
      setToast({ message: "Please enter email content.", type: "error" });
      return;
    }

    if (selectedUserIds.length === 0) {
      setToast({ message: "Please select at least one user.", type: "error" });
      return;
    }

    setSending(true);
    try {
      const apiBase = getApiBase();
      const response = await fetch(`${apiBase}/api/email/send-custom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIds: selectedUserIds,
          subject,
          htmlContent: htmlContent || plainText,
          plainText: plainText || htmlContent,
          emailType: emailType, // Send admin-selected type
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setToast({
          message: data.message || `Email sent to ${selectedUserIds.length} users.`,
          type: "success",
        });
        // Reset form
        setSubject("");
        setHtmlContent("");
        setPlainText("");
        setSelectedUserIds([]);
        setEmailType("custom"); // Reset type
        // Refresh logs
        fetchEmailLogs();
      } else {
        setToast({
          message: data.message || "Failed to send email.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setToast({ message: "Failed to send email. Please try again.", type: "error" });
    } finally {
      setSending(false);
    }
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

        <div className="flex mb-6 justify-between items-center">
          <h1 className="text-3xl font-bold">Email Management</h1>
          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Home
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("compose")}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === "compose"
                ? "text-indigo-400 border-b-2 border-indigo-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Compose Email
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === "logs"
                ? "text-indigo-400 border-b-2 border-indigo-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Email Logs
          </button>
        </div>

        {/* COMPOSE TAB */}
        {activeTab === "compose" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Selection */}
            <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Select Recipients</h2>

              <div className="mb-4 space-y-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="w-full rounded bg-gray-700 px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full rounded bg-gray-700 px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>

              <div className="mb-4">
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {selectedUserIds.length === filteredUsers.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
                <p className="text-xs text-gray-400 mt-1">
                  Selected: {selectedUserIds.length}
                </p>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {filteredUsers.length === 0 ? (
                  <p className="text-gray-400 text-sm">No users found</p>
                ) : (
                  filteredUsers.map((user) => (
                    <label
                      key={user._id}
                      className="flex items-start gap-2 p-2 rounded hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(user._id)}
                        onChange={() => handleUserToggle(user._id)}
                        className="mt-1 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* Email Composition */}
            <div className="lg:col-span-2 space-y-6">
              {/* Email Type Selection */}
              <div className="bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Email Type</h2>
                <select
                  value={emailType}
                  onChange={(e) => setEmailType(e.target.value)}
                  className="w-full rounded bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="custom">Custom Email</option>
                  <option value="individual">Individual Email</option>
                  <option value="bulk">Bulk Email</option>
                  <option value="notification">Notification</option>
                  <option value="announcement">Announcement</option>
                  <option value="other">Task</option>
                  <option value="reminder">Reminder</option>
                  <option value="other">Other</option>
                </select>
                <p className="text-xs text-gray-400 mt-2">
                  Select the category for this email (for organization purposes).
                </p>
              </div>

              {/* Subject */}
              <div className="bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Email Subject</h2>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject"
                  className="w-full rounded bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* HTML Content */}
              <div className="bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">HTML Content</h2>
                <textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  placeholder="Enter HTML content (optional). Can include <h1>, <p>, <a>, <img>, etc."
                  className="w-full h-48 rounded bg-gray-700 px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono resize-none"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Tip: Use HTML tags for formatting. If empty, plain text will be used.
                </p>
              </div>

              {/* Plain Text Content */}
              <div className="bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Plain Text Content</h2>
                <textarea
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value)}
                  placeholder="Enter plain text content (fallback for emails that don't support HTML)"
                  className="w-full h-32 rounded bg-gray-700 px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Preview */}
              {(htmlContent || plainText) && (
                <div className="bg-gray-800 p-6 rounded-xl shadow">
                  <h2 className="text-xl font-semibold mb-4">Preview</h2>
                  <div className="bg-gray-900 p-4 rounded border border-gray-700 max-h-48 overflow-y-auto">
                    {htmlContent ? (
                      <div
                        className="text-gray-300 text-sm"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                      />
                    ) : (
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">
                        {plainText}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Send Button */}
              <button
                onClick={handleSendEmail}
                disabled={
                  sending ||
                  selectedUserIds.length === 0 ||
                  !subject.trim() ||
                  (!htmlContent.trim() && !plainText.trim())
                }
                className={`w-full py-3 px-4 rounded font-semibold transition-colors ${
                  sending ||
                  selectedUserIds.length === 0 ||
                  !subject.trim() ||
                  (!htmlContent.trim() && !plainText.trim())
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {sending
                  ? `Sending to ${selectedUserIds.length} users...`
                  : `Send Email to ${selectedUserIds.length} Users`}
              </button>
            </div>
          </div>
        )}

        {/* LOGS TAB */}
        {activeTab === "logs" && (
          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Email Send History</h2>

            {logsLoading ? (
              <p className="text-gray-400">Loading logs...</p>
            ) : emailLogs.length === 0 ? (
              <p className="text-gray-400">No emails sent yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-600">
                    <tr>
                      <th className="text-left py-2 px-4">Subject</th>
                      <th className="text-left py-2 px-4">Recipients (Names)</th>
                      <th className="text-left py-2 px-4">Type</th>
                      <th className="text-left py-2 px-4">Sent By</th>
                      <th className="text-left py-2 px-4">Sent At</th>
                      <th className="text-left py-2 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {emailLogs.map((log) => (
                      <tr 
                        key={log._id} 
                        className="hover:bg-gray-700/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedLog(log)}
                      >
                        <td className="py-3 px-4 truncate max-w-xs">{log.subject}</td>
                        <td className="py-3 px-4 text-sm max-w-xs truncate" title={getUserNames(log.userIds)}>
                          {getUserNames(log.userIds)}
                        </td>
                        <td className="py-3 px-4 capitalize">{log.type}</td>
                        <td className="py-3 px-4 text-xs text-gray-400">
                          {log.sentBy || "N/A"}
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-400">
                          {log.sentAt
                            ? new Date(log.sentAt).toLocaleString()
                            : "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              log.status === "success"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* EMAIL CONTENT MODAL */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-96 flex flex-col border border-gray-700">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-white">{selectedLog.subject}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Sent to: {getUserNames(selectedLog.userIds)}
                </p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Body - Email Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {selectedLog.htmlContent ? (
                <div
                  className="prose prose-invert max-w-none text-gray-200"
                  dangerouslySetInnerHTML={{ __html: selectedLog.htmlContent }}
                />
              ) : selectedLog.plainText ? (
                <p className="text-gray-200 whitespace-pre-wrap">
                  {selectedLog.plainText}
                </p>
              ) : selectedLog.message ? (
                <p className="text-gray-200">{selectedLog.message}</p>
              ) : (
                <p className="text-gray-400 italic">No content available</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-700 p-6 flex justify-between items-center">
              <div className="text-xs text-gray-400 space-y-1">
                <p>Type: <span className="capitalize text-gray-300">{selectedLog.type}</span></p>
                <p>Sent: {selectedLog.sentAt ? new Date(selectedLog.sentAt).toLocaleString() : "N/A"}</p>
                <p>Status: 
                  <span className={`ml-2 ${
                    selectedLog.status === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}>
                    {selectedLog.status}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
