import { useState } from "react";
import { Loader2, X } from "lucide-react";
import api from "@/api/client";
import type { Task } from "@/types/task";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: Task) => void;
}

const CreateTaskModal = ({
  isOpen,
  onClose,
  onTaskCreated,
}: CreateTaskModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    emoji: "📝",
    description: "",
    deadlineDate: "",
    deadlineTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name) {
      setError("Task name is required");
      return;
    }

    setIsLoading(true);
    try {
      let finalDeadline = null;
      if (formData.deadlineDate) {
        const timeString = formData.deadlineTime || "23:59";
        finalDeadline = new Date(
          `${formData.deadlineDate}T${timeString}`,
        ).toISOString();
      }

      const payload = {
        name: formData.name,
        emoji: formData.emoji,
        description: formData.description,
        deadline: finalDeadline,
      };

      const response = await api.post("/tasks", payload);
      onTaskCreated(response.data);

      setFormData({
        name: "",
        emoji: "📝",
        description: "",
        deadlineDate: "",
        deadlineTime: "",
      });
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md rounded-2xl border border-stone-800 bg-stone-900 p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-stone-50">
            Create Task
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-200"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
            {Array.isArray(error) ? error[0] : error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="w-20">
              <label className="mb-1.5 block text-sm font-medium text-stone-300">
                Emoji
              </label>
              <input
                type="text"
                name="emoji"
                value={formData.emoji}
                onChange={handleChange}
                className="w-full rounded-xl border border-stone-700/50 bg-stone-950 p-3 text-center text-xl text-stone-50 outline-none transition-all focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-medium text-stone-300">
                Task Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="What needs to be done?"
                className="w-full rounded-xl border border-stone-700/50 bg-stone-950 p-3 text-stone-50 outline-none transition-all focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-stone-300">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Add some details..."
              className="w-full resize-none rounded-xl border border-stone-700/50 bg-stone-950 p-3 text-stone-50 outline-none transition-all focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-medium text-stone-300">
                Date (Optional)
              </label>
              <input
                type="date"
                name="deadlineDate"
                value={formData.deadlineDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-stone-700/50 bg-stone-950 p-3 text-stone-50 outline-none transition-all focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 [color-scheme:dark]"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-medium text-stone-300">
                Time
              </label>
              <input
                type="time"
                name="deadlineTime"
                value={formData.deadlineTime}
                onChange={handleChange}
                disabled={!formData.deadlineDate}
                className="w-full rounded-xl border border-stone-700/50 bg-stone-950 p-3 text-stone-50 outline-none transition-all focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 [color-scheme:dark] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl px-4 py-2 text-sm font-medium text-stone-300 transition-colors hover:bg-stone-800 hover:text-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-32 cursor-pointer items-center justify-center rounded-xl bg-orange-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-orange-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
