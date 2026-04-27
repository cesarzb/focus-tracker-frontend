"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import api from "@/api/client";
import type { Session } from "@/types/session";
import SessionCard from "@/components/Sessions/SessionCard";
import PeriodSelector from "@/components/ui/PeriodSelector/PeriodSelector";
import SessionFormModal from "@/components/Sessions/SessionFormModal";

const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [period, setPeriod] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions", {
          params: { period_type: period },
        });
        setSessions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSessions();
  }, [period]);

  const handleOpenCreate = () => {
    setSessionToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (session: Session) => {
    setSessionToEdit(session);
    setIsModalOpen(true);
  };

  const handleSessionSaved = (savedSession: Session) => {
    setSessions((prev) => {
      const exists = prev.some((s) => s.id === savedSession.id);
      return exists
        ? prev.map((s) => (s.id === savedSession.id ? savedSession : s))
        : [savedSession, ...prev];
    });
  };

  const deleteSession = (id: number) => {
    api.delete(`/sessions/${id}`).then(() => {
      setSessions((prev) => prev.filter((s) => s.id !== id));
    });
  };

  return (
    <div className="min-h-screen bg-stone-900 p-8 text-stone-50">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Focus Sessions
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-500"
          >
            <Plus size={18} /> New Session
          </button>
          <PeriodSelector currentPeriod={period} onChange={setPeriod} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            deleteSession={deleteSession}
            onEdit={handleOpenEdit}
          />
        ))}
      </div>

      <SessionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sessionToEdit={sessionToEdit}
        onSessionSaved={handleSessionSaved}
      />
    </div>
  );
};

export default Sessions;
