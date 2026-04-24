"use client";

import { useEffect, useState } from "react";
import api from "@/api/client";
import type { Session } from "@/types/session";
import SessionCard from "@/components/Sessions/SessionCard";

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
          prev.filter((session) => session.id !== sessionId),
        );
      });
    } catch (err) {
      console.error(`Failed to delete session #${sessionId}`, err);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 p-8 text-stone-50">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-stone-50">
          Focus Sessions
        </h2>
      </div>

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
          <div className="col-span-full rounded-2xl border border-stone-800 bg-stone-800/40 p-8 text-center text-stone-400 backdrop-blur-sm">
            <p>No sessions yet. Start a timer to create one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
