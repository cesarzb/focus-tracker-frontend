import { useEffect, useState } from "react";
import api from "../../api/client";
import type { Session } from "../../types/session";
import SessionCard from "./SessionCard.tsx";

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

  const deleteSession = (sessionId: number) => {
    try {
      api.delete(`/sessions/${sessionId}`).then(() => {
        setSessions((prev) =>
          prev.filter((session) => session.id != sessionId),
        );
      });
    } catch (err) {
      console.error(`Failed to delete session #${sessionId}`, err);
    }
  };

  return (
    <div className="p-8 bg-stone-900 min-h-screen text-stone-50">
      <h2 className="text-2xl font-bold mb-6">Focus Sessions</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sessions.length > 0 ? (
          sessions.map((session: Session) => (
            <SessionCard
              key={session.id}
              session={session}
              deleteSession={deleteSession}
            />
          ))
        ) : (
          <p>No sessions yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
