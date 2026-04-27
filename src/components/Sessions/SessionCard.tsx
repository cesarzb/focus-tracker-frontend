"use client";

import { MouseEvent } from "react";
import type { Session } from "../../types/session";
import { Trash, Pencil, PlayCircle, StopCircle, Activity } from "lucide-react";

interface SessionCardProps {
  session: Session;
  deleteSession: (sessionId: number) => void;
  onEdit: (session: Session) => void;
}

const SessionCard = ({ session, deleteSession, onEdit }: SessionCardProps) => {
  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteSession(session.id);
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit(session);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-800/40 p-5 backdrop-blur-sm transition-all hover:border-stone-700 hover:bg-stone-800/60 hover:shadow-lg hover:shadow-black/20">
      <div className="flex w-full items-start justify-between gap-4">
        <h3 className="flex items-center gap-2 text-lg font-bold leading-tight text-stone-100 capitalize">
          <Activity size={18} className="text-orange-500" />
          {session.name}
        </h3>

        <div className="flex shrink-0 items-center gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          <button
            onClick={handleEdit}
            className="cursor-pointer rounded-lg p-2 text-stone-400 transition-colors hover:bg-orange-500/10 hover:text-orange-400"
            aria-label="Edit session"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="cursor-pointer rounded-lg p-2 text-stone-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
            aria-label="Delete session"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-center gap-3 rounded-lg border border-stone-800/50 bg-stone-900/50 p-2.5 text-xs font-medium text-stone-400">
          <PlayCircle size={14} className="text-emerald-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-stone-500 font-semibold">
              Started
            </span>
            <span>
              {new Date(session.startTime).toLocaleString([], {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-stone-800/50 bg-stone-900/50 p-2.5 text-xs font-medium text-stone-400">
          <StopCircle size={14} className="text-orange-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-stone-500 font-semibold">
              Ended
            </span>
            <span>
              {new Date(session.endTime).toLocaleString([], {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
