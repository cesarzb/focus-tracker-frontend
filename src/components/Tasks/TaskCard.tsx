import type { Task } from "@/types/task";
import { Trash, Pencil, CalendarClock, AlignLeft } from "lucide-react";

interface TaskCardProps {
  task: Task;
  deleteTask: (taskId: number) => void;
  onEdit: (task: Task) => void;
}

const TaskCard = ({ task, deleteTask, onEdit }: TaskCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(task);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-800/40 p-5 backdrop-blur-sm transition-all hover:border-stone-700 hover:bg-stone-800/60 hover:shadow-lg hover:shadow-black/20">
      <div className="flex w-full items-start justify-between gap-4">
        <h3 className="text-lg font-bold leading-tight text-stone-100">
          <span className="mr-2 text-xl">{task.emoji}</span>
          {task.name}
        </h3>

        <div className="flex shrink-0 items-center gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          <button
            onClick={handleEdit}
            className="cursor-pointer rounded-lg p-2 text-stone-400 transition-colors hover:bg-orange-500/10 hover:text-orange-400"
            aria-label="Edit task"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="cursor-pointer rounded-lg p-2 text-stone-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
            aria-label="Delete task"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      {task.description && (
        <div className="mt-4 flex items-start gap-2 text-sm text-stone-400">
          <AlignLeft size={16} className="mt-0.5 shrink-0 text-stone-500" />
          <p className="line-clamp-3 leading-relaxed">{task.description}</p>
        </div>
      )}

      {task.deadline && (
        <div className="mt-5 flex items-center gap-2 rounded-lg bg-stone-900/50 p-2.5 text-xs font-medium text-stone-400 border border-stone-800/50">
          <CalendarClock size={14} className="text-orange-500" />
          <span>
            {new Date(task.deadline).toLocaleString([], {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
