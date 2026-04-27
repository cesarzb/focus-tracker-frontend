"use client";

import { useEffect, useState } from "react";
import api from "@/api/client";
import type { Session } from "@/types/session";
import SessionCard from "@/components/Sessions/SessionCard";
import PeriodSelector from "@/components/ui/PeriodSelector/PeriodSelector"; // Import your new component

const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [period, setPeriod] = useState("all");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions", {
          params: { period_type: period },
        });
        setSessions(response.data);
      } catch (err) {
        console.error("Failed to load sessions", err);
      }
    };
    fetchSessions();
  }, [period]);

  const deleteSession = (sessionId: number) => {
    api
      .delete(`/sessions/${sessionId}`)
      .then(() => {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-stone-900 p-8 text-stone-50">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Focus Sessions
        </h2>

        {/* Clean and separate */}
        <PeriodSelector currentPeriod={period} onChange={setPeriod} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              deleteSession={deleteSession}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

// Small sub-component for empty states
const EmptyState = () => (
  <div className="col-span-full rounded-2xl border border-stone-800 bg-stone-800/40 p-12 text-center text-stone-400 backdrop-blur-sm">
    <p>No sessions found. Time to focus!</p>
  </div>
);

export default Sessions;
