import { useEffect, useState } from "react";
import api from "../../api/client";
import type { Session } from "../../types/session";

const Dashboard = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions");
        setSessions(response.data);
      } catch (err) {
        console.error("Failed to load sessions", err);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="p-8 bg-stone-900 min-h-screen text-stone-50">
      <h2 className="text-2xl font-bold mb-6">Focus Sessions</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="p-5 rounded-2xl border border-stone-800 bg-stone-800/40 backdrop-blur-sm hover:border-orange-500/50 transition-all"
          >
            <h3 className="text-lg font-bold text-orange-500 capitalize">
              {session.name}
            </h3>
            <div className="mt-3 text-sm text-stone-400 space-y-1">
              <p>Started: {new Date(session.startTime).toLocaleString()}</p>
              <p>Ended: {new Date(session.endTime).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
