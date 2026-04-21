"use client";

import { useEffect, useState } from "react";
import api from "@/api/client";
import type { Task } from "@/types/task";
import TaskCard from "@/components/Tasks/TaskCard";

const Tasks = () => {
  const [tasks, settasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        settasks(response.data);
      } catch (err) {
        console.error("Failed to load tasks", err);
      }
    };
    fetchTasks();
  }, []);

  const deleteTask = (taskId: number) => {
    try {
      api.delete(`/tasks/${taskId}`).then(() => {
        settasks((prev) => prev.filter((task) => task.id != taskId));
      });
    } catch (err) {
      console.error(`Failed to delete task #${taskId}`, err);
    }
  };

  return (
    <div className="p-8 bg-stone-900 min-h-screen text-stone-50">
      <h2 className="text-2xl font-bold mb-6">Focus tasks</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.length > 0 ? (
          tasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
          ))
        ) : (
          <p>No tasks yet</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
