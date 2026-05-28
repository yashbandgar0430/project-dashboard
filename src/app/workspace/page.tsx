"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { createProject, getProjects } from "@/lib/projectService";

export default function WorkspacePage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");

  // FETCH PROJECTS
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  // CREATE PROJECT
  const handleCreate = async () => {
    if (!name) return;

    await createProject({
      name,
      createdBy: "admin@gmail.com",
    });

    setName("");
    loadProjects(); // refresh UI
  };

  return (
    <AppLayout>
     <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-6">

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Workspace / Projects
        </h1>

        {/* CREATE BOX */}
        <div className="bg-[#1e293b] p-4 rounded-xl flex gap-3">
          <input
            className="flex-1 p-2 rounded bg-[#334155] text-white"
            placeholder="Enter project name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="bg-blue-600 px-4 py-2 rounded text-white"
          >
            Create
          </button>
        </div>

        {/* PROJECT LIST */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-[#1e293b] p-4 rounded-xl text-white hover:scale-105 transition"
            >
              <h2 className="font-bold">{p.name}</h2>
              <p className="text-gray-400 text-sm">
                Created by: {p.createdBy}
              </p>
            </div>
          ))}

        </div>

      </div>
    </AppLayout>
  );
}