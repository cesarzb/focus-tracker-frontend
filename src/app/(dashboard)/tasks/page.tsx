"use client";

import { useEffect, useState } from "react";
import api from "@/api/client";
import type { Task } from "@/types/task";
import TaskCard from "@/components/Tasks/TaskCard";
import CreateTaskModal from "@/components/Tasks/CreateTaskModal";
import { Plus } from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (err) {
        console.error("Failed to load tasks", err);
      }
    };
    fetchTasks();
  }, []);

  const deleteTask = (taskId: number) => {
    try {
      api.delete(`/tasks/${taskId}`).then(() => {
        setTasks((prev) => prev.filter((task) => task.id != taskId));
      });
    } catch (err) {
      console.error(`Failed to delete task #${taskId}`, err);
    }
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div className="min-h-screen bg-stone-900 p-8 text-stone-50">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-stone-50">
          Focus Tasks
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-500 active:scale-[0.98]"
        >
          <Plus size={18} />
          New Task
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.length > 0 ? (
          tasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-stone-800 bg-stone-800/40 p-8 text-center text-stone-400 backdrop-blur-sm">
            <p>No tasks yet. Create one to get started!</p>
          </div>
        )}
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
};

export default Tasks;
