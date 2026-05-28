import { useEffect, useState } from "react";
import {
  ref,
  onValue,
  remove,
  update,
  push,
} from "firebase/database";
import { database } from "../../firebase/firebase";
import Navbar from "../../components/adminNavbar";
import "./AdminFeedback.css";
import { isAdminLoggedIn, saveAdminDisplayName, getAdminDisplayName } from "../../utils/localAuth";

interface Reply {
  id: string;
  message: string;
  adminName: string;
  created: number;
  updated?: number;
}

interface Feedback {
  id: string;
  name: string;
  email: string;
  type: string;
  priority: string;
  subject: string;
  message: string;
  rating: number;
  status: "Open" | "Closed";
  created: number;
  replies?: Record<string, Reply>;
}

export default function AdminFeedback() {
  const [entries, setEntries] = useState<Feedback[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [editReplyText, setEditReplyText] = useState<Record<string, string>>({});
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string>(getAdminDisplayName() || "");
  const isAdmin = isAdminLoggedIn();

  useEffect(() => {
    const feedbackRef = ref(database, "feedback");

    const unsubscribe = onValue(feedbackRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const parsed = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setEntries(parsed.sort((a, b) => b.created - a.created));
      } else {
        setEntries([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const deleteEntry = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
    await remove(ref(database, `feedback/${id}`));
  };

  const toggleStatus = async (id: string, current: string) => {
    await update(ref(database, `feedback/${id}`), {
      status: current === "Open" ? "Closed" : "Open",
    });
  };

  const saveReply = async (feedbackId: string) => {

 

    const message = (replyText[feedbackId] || "").trim();

if (!message) {
  alert("Reply cannot be empty");
  return;
}

    const replyRef = ref(database, `feedback/${feedbackId}/replies`);

    await push(replyRef, {
      message,
      adminName: adminName || "",
      created: Date.now(),
    });

    setReplyText((prev) => ({ ...prev, [feedbackId]: "" }));
  };

  const startEditReply = (replyId: string, current: string) => {
    setEditingReplyId(replyId);
    setEditReplyText((prev) => ({ ...prev, [replyId]: current }));
  };

  const cancelEdit = (replyId: string) => {
    setEditingReplyId(null);
    setEditReplyText((prev) => ({ ...prev, [replyId]: "" }));
  };

  const updateReply = async (feedbackId: string, replyId: string) => {
 
    const message = editReplyText[replyId];
    if (!message) return;

    await update(ref(database, `feedback/${feedbackId}/replies/${replyId}`), {
      message,
      updated: Date.now(),
    });

    setEditingReplyId(null);
  };

  const deleteReply = async (feedbackId: string, replyId: string) => {
    
    await remove(ref(database, `feedback/${feedbackId}/replies/${replyId}`));
  };

  const filtered = entries.filter((entry) => {
    const combined =
      entry.name +
      entry.email +
      entry.subject +
      entry.message +
      JSON.stringify(entry.replies || "");

    const matchesSearch = combined
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || entry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-feedback-dashboard-layout">
      <Navbar />

      <main className="dashboard-content admin-feedback">
        <h1>Admin Feedback Panel</h1>

        <div className="admin-toolbar">
       

          <select
            className="catei"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Open</option>
            <option>Closed</option>
          </select>

          <div className="admin-name">
            <input
              placeholder="Admin display name (optional)"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
            <button
            className="admin-savebtn"
              onClick={() => {
                saveAdminDisplayName(adminName);
                alert("Admin name saved locally.");
              }}
            >
              <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-3 3m3-3l3 3"></path></svg>
            </button>
          </div>
        </div>

           <input
            placeholder="Search everything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        <div className="admin-list">
          {filtered.map((entry) => {
            const replies = entry.replies
              ? Object.entries(entry.replies).map(([rid, r]) => {
                  // ensure we don't accidentally copy any existing `id` property from r
                  const { id: _omit, ...rest } = r as any;
                  return { id: rid, ...rest };
                })
              : [];

            return (
              <div key={entry.id} className="admin-card">
                <div className="admin-meta">
                  <h3>{entry.subject}</h3>
                  <p>
                    {entry.name} • {entry.email}
                  </p>
                  <p>{entry.message}</p>
                  <span className="badge">{entry.status}</span>
                </div>

                <div className="admin-actions">
                  <button className="admin-actions-toggle"
                    onClick={() => toggleStatus(entry.id, entry.status)}
                  >
                    Toggle Status
                  </button>

                  <button className="admin-actions-delete" onClick={() => deleteEntry(entry.id)}>Delete</button>
                </div>

                <div className="reply-section">
                  {replies.length > 0 && (
                    <div className="existing-replies">
                      <strong>Replies:</strong>
                      {replies.map((r) => (
                        <div key={r.id} className="reply-item">
                          <div className="reply-meta">
                            <small>{r.adminName || ""}</small>
                            <small>
                              {new Date(r.updated || r.created).toLocaleString()}
                            </small>
                          </div>

                          {editingReplyId === r.id ? (
                            <div className="reply-edit">
                              <textarea
                                value={editReplyText[r.id] || ""}
                                onChange={(e) =>
                                  setEditReplyText((prev) => ({
                                    ...prev,
                                    [r.id]: e.target.value,
                                  }))
                                }
                              />

                              <div className="reply-edit-actions">
                                <button onClick={() => updateReply(entry.id, r.id)}>Save</button>
                                <button onClick={() => cancelEdit(r.id)}>Cancel</button>
                              </div>
                            </div>
                          ) : (
                            <div className="reply-body">
                              <p>{r.message}</p>
                              {isAdmin && (
                                <div className="reply-actions">
                                  <button onClick={() => startEditReply(r.id, r.message)}>Edit</button>
                                  <button onClick={() => deleteReply(entry.id, r.id)}>Delete</button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <textarea
                    placeholder={replies.length > 0 ? "Write another reply..." : "Write reply..."}
                    value={replyText[entry.id] || ""}
                    onChange={(e) =>
                      setReplyText((prev) => ({
                        ...prev,
                        [entry.id]: e.target.value,
                      }))
                    }
                  />

                  <button className="admin-actions-save" onClick={() => saveReply(entry.id)}>Send Reply</button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

