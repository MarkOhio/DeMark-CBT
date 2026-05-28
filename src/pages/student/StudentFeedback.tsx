
import { useEffect, useState } from "react";
import { ref, push, onValue } from "firebase/database";
import { database } from "../../firebase/firebase";
import Navbar from "../../components/Navbar";
import "./StudentFeedback.css";
import { saveToStore, loadFromStore, removeFromStore } from "../../utils/offlineStore";

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

export default function StudentFeedback() {
  const [entries, setEntries] = useState<Feedback[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "Complaint",
    priority: "Normal",
    subject: "",
    message: "",
    rating: 0,
  });


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

  // try syncing any pending feedback saved while offline
  useEffect(() => {
    const trySync = async () => {
      const pending = loadFromStore<any[]>("pending_feedbacks");
      if (!pending || pending.length === 0) return;

      const remaining: any[] = [];

      for (const item of pending) {
        try {
          await push(ref(database, "feedback"), item);
        } catch (err) {
          remaining.push(item);
        }
      }

      if (remaining.length === 0) {
        removeFromStore("pending_feedbacks");
      } else {
        saveToStore("pending_feedbacks", remaining);
      }
    };

    trySync();

    const onOnline = () => trySync();
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) return;

    const payload = {
      ...form,
      status: "Open",
      created: Date.now(),
    };

    try {
      await push(ref(database, "feedback"), payload);
    } catch (err) {
      // Save to local pending store to sync later
      const existing = loadFromStore<any[]>("pending_feedbacks") || [];
      existing.push(payload);
      saveToStore("pending_feedbacks", existing);
      alert("You appear to be offline. Your feedback will be submitted when you're back online.");
    }

    setForm({
      name: "",
      email: "",
      type: "Complaint",
      priority: "Normal",
      subject: "",
      message: "",
      rating: 0,
    });
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <main className="dashboard-content feedback-wrap">
        <header className="feedback-header">
          <h1>Feedback Portal</h1>
          <p>Submit complaints and track responses from admin.</p>
        </header>

        <div className="feedback-grid">
          {/* FORM */}
          <section className="card">
            <h2>New Entry</h2>

            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="two">
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="two">
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value })
                  }
                >
                 
                  <option>Complaint</option>
                  <option>Feedback</option>
                  <option>Suggestion</option>
                  <option>Praise</option>
                </select>

                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                >
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                required
              />

              <textarea
                rows={5}
                placeholder="Message"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
              />

              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      form.rating >= star ? "star filled" : "star"
                    }
                    onClick={() =>
                      setForm({ ...form, rating: star })
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <button type="submit" className="btn">
                Submit
              </button>
            </form>
          </section>

          {/* LIST */}
          <section className="card" id="Entries">
            <h2>Entries</h2>

            {entries.length === 0 && (
              <div className="empty">No entries yet.</div>
            )}

            <div className="list">
              {entries.map((entry) => {
                const reply =
                  entry.replies &&
                  Object.values(entry.replies)[0];

                return (
                  <div key={entry.id} className="item">
                    <div className="meta">
                      <h3>{entry.subject}</h3>
                      <p>
                        {entry.name} •{" "}
                        {new Date(entry.created).toLocaleString()}
                      </p>

                     

                      <p className="excerpt">
                        {entry.message.slice(0, 140)}
                      </p>

                       <div className="tags">
                        <span className="tag">
                         <p> {entry.type} • {entry.priority}</p>
                        </span>
                        <span id="stat"
                          className={
                            entry.status === "Open"
                              ? "badge status-open"
                              : "badge status-closed"
                          }
                        >
                         <p> {entry.status}</p>
                        </span>
                         <div className="entry-rating">
                        <p> {entry.rating}★</p> 
                      </div>
                      </div>

                     

                      {/* ADMIN REPLY DISPLAY */}
                      {reply && (
                        <div className="admin-reply">
                          <strong>Admin Reply{reply.adminName ? ` — ${reply.adminName}` : ""}:</strong>
                          <p>{reply.message}</p>
                          <small>
                            {new Date(
                              reply.updated || reply.created
                            ).toLocaleString()}
                          </small>
                        </div>
                      )}
                    </div>

                    {/* <div className="actions">
                      <button
                        onClick={() =>
                          toggleStatus(entry.id, entry.status)
                        }
                      >
                        Toggle
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                      >
                        Delete
                      </button>
                    </div> */}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
