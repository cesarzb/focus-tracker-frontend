import type { Session } from "../../types/session";
import { Trash } from "lucide-react";

interface SessionCardProps {
  session: Session;
  deleteSession: (sessionId: number) => void;
}

const SessionCard = ({ session, deleteSession }: SessionCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSession(session.id);
  };

  return (
    <div className="group relative p-5 rounded-2xl border border-stone-800 bg-stone-800/40 backdrop-blur-sm hover:border-stone-700 transition-all">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-bold text-orange-500 capitalize leading-tight">
          {session.name}
        </h3>

        <button
          onClick={handleDelete}
          className="p-2 -mr-2 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
          aria-label="Delete session"
        >
          <Trash size={18} />
        </button>
      </div>

      <div className="mt-4 space-y-2 text-xs sm:text-sm text-stone-400">
        <div className="flex flex-col">
          <span className="text-stone-500 text-[10px] uppercase tracking-wider font-semibold">
            Started
          </span>
          <span>{new Date(session.startTime).toLocaleString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-stone-500 text-[10px] uppercase tracking-wider font-semibold">
            Ended
          </span>
          <span>{new Date(session.endTime).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
