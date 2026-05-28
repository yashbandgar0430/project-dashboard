"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Task } from "@/types/task";

export default function TasksPage() {

  // STATE
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ADD TASK
  const addTask = () => {
    if (!title.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title,
        description,
        status: "todo",
      },
    ]);

    setTitle("");
    setDescription("");
  };

  // CHANGE STATUS
  const changeStatus = (id: string, status: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  return (
    <AppLayout>

      {/* CONTENT WRAPPER (NO EXTRA PADDING HERE) */}
      <div className="w-full max-w-5xl mx-auto space-y-6 px-3 md:px-0">

        {/* TITLE */}
        <h1 className="text-3xl font-bold">Tasks Page</h1>

        {/* CREATE TASK BOX */}
        <div className="bg-[#1e293b] text-white p-4 rounded-xl shadow space-y-3">

          <input
            className="w-full p-2 border rounded"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-2 border rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 transition"
          >
            Add Task
          </button>

        </div>

        {/* TASK LIST */}
        <div className="space-y-3">

          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-[#1e293b] text-white p-4 rounded-xl shadow"
            >

              <h2 className="font-bold">{task.title}</h2>
              <p className="text-gray-500">{task.description}</p>

              <div className="text-sm mt-2 text-blue-600">
                Status: {task.status}
              </div>

              <div className="flex gap-3 mt-3">

                <button
                  onClick={() => changeStatus(task.id, "progress")}
                  className="text-yellow-500"
                >
                  Progress
                </button>

                <button
                  onClick={() => changeStatus(task.id, "done")}
                  className="text-green-500"
                >
                  Done
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </AppLayout>
  );
}