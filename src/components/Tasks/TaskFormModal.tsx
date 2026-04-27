"use client";

import { useState, useEffect, SyntheticEvent } from "react";
import { Loader2 } from "lucide-react";
import api from "@/api/client";
import type { Task } from "@/types/task";
import ModalLayout from "@/components/ui/Modal/ModalLayout";
import FormInput from "@/components/ui/Form/FormInput";
import FormTextArea from "@/components/ui/Form/FormTextArea";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskSaved: (task: Task) => void;
  taskToEdit?: Task | null;
}

const TaskFormModal = ({
  isOpen,
  onClose,
  onTaskSaved,
  taskToEdit,
}: TaskFormModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    emoji: "📝",
    description: "",
    deadlineDate: "",
    deadlineTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && taskToEdit) {
      const d = taskToEdit.deadline ? new Date(taskToEdit.deadline) : null;
      setFormData({
        name: taskToEdit.name,
        emoji: taskToEdit.emoji || "📝",
        description: taskToEdit.description || "",
        deadlineDate: d ? d.toISOString().split("T")[0] : "",
        deadlineTime: d ? d.toTimeString().substring(0, 5) : "",
      });
    } else if (isOpen) {
      setFormData({
        name: "",
        emoji: "📝",
        description: "",
        deadlineDate: "",
        deadlineTime: "",
      });
    }
  }, [isOpen, taskToEdit]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const deadline = formData.deadlineDate
        ? new Date(
            `${formData.deadlineDate}T${formData.deadlineTime || "23:59"}`,
          ).toISOString()
        : null;

      const payload = { ...formData, deadline };
      const res = taskToEdit
        ? await api.patch(`/tasks/${taskToEdit.id}`, payload)
        : await api.post("/tasks", payload);

      onTaskSaved(res.data);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? "Edit Task" : "Create Task"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex gap-4">
          <FormInput
            label="Emoji"
            name="emoji"
            value={formData.emoji}
            className="text-center text-xl"
            onChange={(e) =>
              setFormData({ ...formData, emoji: e.target.value })
            }
          />
          <FormInput
            label="Task Name"
            name="name"
            value={formData.name}
            placeholder="What's next?"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <FormTextArea
          label="Description"
          name="description"
          value={formData.description}
          rows={3}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <div className="flex gap-4">
          <FormInput
            label="Date"
            type="date"
            value={formData.deadlineDate}
            onChange={(e) =>
              setFormData({ ...formData, deadlineDate: e.target.value })
            }
          />
          <FormInput
            label="Time"
            type="time"
            value={formData.deadlineTime}
            disabled={!formData.deadlineDate}
            onChange={(e) =>
              setFormData({ ...formData, deadlineTime: e.target.value })
            }
          />
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-medium text-stone-300 hover:bg-stone-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-32 items-center justify-center rounded-xl bg-orange-600 py-2 text-sm font-bold text-white hover:bg-orange-500 active:scale-95 transition-all"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : taskToEdit ? (
              "Save Task"
            ) : (
              "Create Task"
            )}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default TaskFormModal;
