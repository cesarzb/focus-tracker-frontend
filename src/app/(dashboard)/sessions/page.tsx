"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  format,
} from "date-fns";
import api from "@/api/client";
import type { Session } from "@/types/session";
import SessionCard from "@/components/Sessions/SessionCard";
import PeriodSelector from "@/components/ui/PeriodSelector/PeriodSelector";
import SessionFormModal from "@/components/Sessions/SessionFormModal";

const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [period, setPeriod] = useState("all");
  const [referenceDate, setReferenceDate] = useState(new Date());

  // Pagination States
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState<Session | null>(null);

  const fetchSessions = useCallback(
    async (targetPage: number, append: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await api.get("/sessions", {
          params: {
            periodType: period,
            selectedDate:
              period !== "all" ? referenceDate.toISOString() : undefined,
            page: targetPage,
          },
        });

        const newSessions = response.data;

        if (append) {
          setSessions((prev) => [...prev, ...newSessions]);
        } else {
          setSessions(newSessions);
        }

        // If we got fewer than 12 items, we reached the end
        setHasMore(newSessions.length === 12);
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [period, referenceDate],
  );

  // Reset and fetch when filters change
  useEffect(() => {
    setPage(0);
    fetchSessions(0, false);
  }, [period, referenceDate, fetchSessions]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchSessions(nextPage, true);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    const isNext = direction === "next";
    switch (period) {
      case "day":
        setReferenceDate((prev) =>
          isNext ? addDays(prev, 1) : subDays(prev, 1),
        );
        break;
      case "week":
        setReferenceDate((prev) =>
          isNext ? addWeeks(prev, 1) : subWeeks(prev, 1),
        );
        break;
      case "month":
        setReferenceDate((prev) =>
          isNext ? addMonths(prev, 1) : subMonths(prev, 1),
        );
        break;
    }
  };

  const handleOpenEdit = (session: Session) => {
    setSessionToEdit(session);
    setIsModalOpen(true);
  };

  const handleSessionSaved = () => {
    // Refresh the view from scratch to ensure correct order/pagination
    setPage(0);
    fetchSessions(0, false);
  };

  const deleteSession = (id: number) => {
    api.delete(`/sessions/${id}`).then(() => {
      setSessions((prev) => prev.filter((s) => s.id !== id));
    });
  };

  return (
    <div className="min-h-screen bg-stone-900 p-8 text-stone-50">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Focus Sessions
          </h2>
          <div className="flex items-center gap-2 text-stone-400 h-8">
            {period !== "all" && (
              <>
                <div className="flex items-center gap-1 mr-2">
                  <button
                    onClick={() => handleNavigate("prev")}
                    className="p-1 hover:bg-stone-800 rounded-lg transition-colors text-stone-500 hover:text-orange-500"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => handleNavigate("next")}
                    className="p-1 hover:bg-stone-800 rounded-lg transition-colors text-stone-500 hover:text-orange-500"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <span className="text-sm font-medium tracking-wide">
                  {period === "day" && format(referenceDate, "MMMM d, yyyy")}
                  {period === "week" &&
                    `Week of ${format(referenceDate, "MMM d")}`}
                  {period === "month" && format(referenceDate, "MMMM yyyy")}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setSessionToEdit(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-500 active:scale-[0.98]"
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

      {sessions.length === 0 && !isLoading && (
        <div className="rounded-2xl border border-stone-800 bg-stone-800/40 p-12 text-center text-stone-400 backdrop-blur-sm">
          No sessions found for this {period}.
        </div>
      )}

      {/* Load More Section */}
      <div className="mt-12 flex justify-center">
        {hasMore && sessions.length > 0 && (
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl border border-stone-800 bg-stone-800/40 px-8 py-3 text-sm font-bold text-stone-300 transition-all hover:border-stone-700 hover:text-stone-100 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Load More Sessions"
            )}
          </button>
        )}
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
