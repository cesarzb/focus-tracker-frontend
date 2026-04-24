import type { Task } from "@/types/task";
import { Trash } from "lucide-react";

interface taskCardProps {
  task: Task;
  deleteTask: (taskId: number) => void;
}

const taskCard = ({ task, deleteTask }: taskCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  return (
    <div className="group relative p-5 rounded-2xl border border-stone-800 bg-stone-800/40 backdrop-blur-sm hover:border-stone-700 transition-all">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-bold text-orange-500 capitalize leading-tight">
          {`${task.emoji} ${task.name}`}
        </h3>

        <button
          onClick={handleDelete}
          className="p-2 -mr-2 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
          aria-label="Delete task"
        >
          <Trash size={18} />
        </button>
      </div>

      {task.description && (
        <div className="mt-4 space-y-2 text-xs sm:text-sm text-stone-400">
          <div className="flex flex-col">
            <span>{task.description}</span>
          </div>
        </div>
      )}

      {task.deadline && (
        <div className="mt-4 space-y-2 text-xs sm:text-sm text-stone-400">
          <div className="flex flex-col">
            <span className="text-stone-500 text-[10px] uppercase tracking-wider font-semibold">
              Deadline
            </span>
            <span>{new Date(task.deadline).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default taskCard;
