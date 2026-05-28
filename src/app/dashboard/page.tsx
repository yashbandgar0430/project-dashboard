"use client";

import { useEffect, useState } from "react";


import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import TaskCard from "@/components/task/TaskCard";

import { updateTaskStatus } from "@/lib/taskService";
import { db } from "@/lib/firebase";
import { useTheme } from "@/context/ThemeContext";
import CalendarWidget from "@/components/CalendarWidget";
import TaskBarChart from "@/components/TaskBarChart";
import UserList from "@/components/admin/UserList";
import { getUsers } from "@/lib/userService";
import ActivityTimeline from "@/components/admin/ActivityTimeline";
import { addDoc } from "firebase/firestore";





import {
  addTask,
  getTasks
} from "@/lib/taskService";

import { Task } from "@/types/task";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import {
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@/lib/firebase";


export default function DashboardPage() {

  const [tasks, setTasks] = useState<any[]>([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<any>(null);
  const { darkMode, toggleTheme } = useTheme();
  const [users, setUsers] = useState<any[]>([]);
  const isAdmin =
    user?.email === "admin@gmail.com";



  useEffect(() => {

  const authUnsub = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });


  const taskUnsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
    const updatedTasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTasks(updatedTasks);
    setLoading(false);
  });

 
  
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  // run only if admin
  if (isAdmin) {
    fetchUsers();
  }


  return () => {
    authUnsub();
    taskUnsub();
  };

}, [isAdmin]);
const handleAddTask = async () => {
  if (!title || !description) {
    return alert("Fill all fields");
  }

  await addTask({
    title,
    description,
    status: "todo",
  });

  // 🟢 TASK CREATED LOG
  await addDoc(collection(db, "activity"), {
    message: "Task Created",
    user: user?.email || "Unknown",
    time: Date.now(),
  });

  setTitle("");
  setDescription("");
};

const handleDeleteTask = async (id: string) => {
  try {
    await deleteDoc(doc(db, "tasks", id));

    // 🔴 TASK DELETED LOG
    await addDoc(collection(db, "activity"), {
      message: "Task Deleted",
      user: user?.email || "Unknown",
      time: Date.now(),
    });

  } catch (err) {
    console.log(err);
  }
};

const handleDragEnd = async (result: any) => {
  if (!result.destination) return;

  const taskId = result.draggableId;
  const newStatus = result.destination.droppableId;

  await updateTaskStatus(taskId, newStatus);

  // 🟡 TASK COMPLETED / UPDATED LOG
  await addDoc(collection(db, "activity"), {
    message: "Task Updated",
    user: user?.email || "Unknown",
    time: Date.now(),
  });
};
return (

  <div className="flex min-h-screen overflow-x-hidden bg-[#0f172a] text-white">

    <Sidebar
      isAdmin={isAdmin}
    />

    <div className="flex-1 w-full overflow-y-auto ml-0 md:ml-72">

      <Navbar
        isAdmin={isAdmin}
      />


      <div className="p-4 md:p-6 w-full">

        <h1 className="text-3xl font-bold text-white mb-6">
          Task Board
        </h1>
        {/* DASHBOARD STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6 mb-10 lg:mb-12">

          {/* TOTAL TASKS */}
          <div className="bg-[#1e293b] p-4 rounded-xl shadow-md border border-slate-700 ">
            <p className="text-gray-400 text-sm">Total Tasks</p>
            <h2 className="text-white text-2xl font-bold mt-1">
              {tasks.length}
            </h2>
          </div>

          {/* COMPLETED */}
          <div className="bg-[#1e293b] p-4 rounded-xl shadow-md border border-slate-700">
            <p className="text-gray-400 text-sm">Completed</p>
            <h2 className="text-green-400 text-2xl font-bold mt-1">
              {tasks.filter(t => t.status === "done").length}
            </h2>
          </div>

          {/* IN PROGRESS */}
          <div className="bg-[#1e293b] p-4 rounded-xl shadow-md border border-slate-700">
            <p className="text-gray-400 text-sm">In Progress</p>
            <h2 className="text-yellow-400 text-2xl font-bold mt-1">
              {tasks.filter(t => t.status === "progress").length}
            </h2>
          </div>

          {/* PENDING / TODO */}
          <div className="bg-[#1e293b] p-4 rounded-xl shadow-md border border-slate-700">
            <p className="text-gray-400 text-sm">Pending</p>
            <h2 className="text-blue-400 text-2xl font-bold mt-1">
              {tasks.filter(t => t.status === "todo").length}
            </h2>
          </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Graph */}
          <TaskBarChart />

          {/*Calendar*/}
          <CalendarWidget />
           <ActivityTimeline />
        </div>
        
        {/* ADMIN PANEL */}
        {isAdmin && (
          <div className="mt-6">
            <UserList users={users} />
          </div>
        )}


        {/* CREATE TASK SECTION */}

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg mt-12 lg:mt-16 mb-10 w-full max-w-5xl mx-auto">

          <h2 className="text-3xl font-bold text-white mb-6">
            Create New Task
          </h2>

          <div className="flex flex-col space-y-5">

            {/* TASK TITLE */}

            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full h-14 px-5 rounded-xl bg-[#334155] text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500 text-base flex items-center" />

            {/* TASK DESCRIPTION */}

            <textarea
              placeholder="Enter task description..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={4}
              className="w-full px-5 pt-4 rounded-xl bg-[#334155] text-white placeholder:text-gray-400 outline-none resize-none focus:ring-2 focus:ring-blue-500 text-base" />

            {/* BUTTON */}

            <button
              onClick={handleAddTask}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-8 py-3 rounded-xl font-semibold w-fit"
            >
              Add Task
            </button>

          </div>



        </div>

        {/* DRAG DROP CONTEXT */}
        <div className="mt-6">
          <DragDropContext
            onDragEnd={handleDragEnd}
          >
            {/* EMPTY STATE */}
            {!loading && tasks.length === 0 && (
              <div className="text-center text-gray-400 py-10 text-lg">
                No Tasks Yet 🚀
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* TODO COLUMN */}

              <Droppable droppableId="todo">

                {(provided) => (

                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-[#1e293b] p-5 rounded-2xl shadow-lg min-h-[420px] flex flex-col"
                  >

                    <h2 className="text-white font-semibold text-xl mb-5">
                      To Do  ({tasks.filter(t => t.status === "todo").length})
                    </h2>

                    {tasks
                      .filter((task) =>
                        task.status === "todo"
                      )
                      .map((task, index) => (

                        <Draggable
                          key={task.id}
                          draggableId={task.id!}
                          index={index}
                        >

                          {(provided) => (

                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >

                              <TaskCard
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                onDelete={handleDeleteTask}
                              />

                            </div>

                          )}

                        </Draggable>

                      ))}

                    {provided.placeholder}

                  </div>

                )}

              </Droppable>

              {/* IN PROGRESS COLUMN */}

              <Droppable droppableId="progress">

                {(provided) => (

                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-[#1e293b] p-5 rounded-2xl shadow-lg min-h-[420px] flex flex-col"
                  >

                    <h2 className="text-white font-semibold text-xl mb-5">
                      In Progress  ({tasks.filter(t => t.status === "progress").length})
                    </h2>

                    {tasks
                      .filter((task) =>
                        task.status === "progress"
                      )
                      .map((task, index) => (

                        <Draggable
                          key={task.id}
                          draggableId={task.id!}
                          index={index}
                        >

                          {(provided) => (

                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >

                              <TaskCard
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                onDelete={handleDeleteTask}
                              />

                            </div>

                          )}

                        </Draggable>

                      ))}

                    {provided.placeholder}

                  </div>

                )}

              </Droppable>

              {/* DONE COLUMN */}

              <Droppable droppableId="done">

                {(provided) => (

                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-[#1e293b] p-5 rounded-2xl shadow-lg min-h-[420px] flex flex-col"
                  >

                    <h2 className="text-white font-semibold text-xl mb-5">
                      Done ({tasks.filter(t => t.status === "done").length})
                    </h2>

                    {tasks
                      .filter((task) =>
                        task.status === "done"
                      )
                      .map((task, index) => (

                        <Draggable
                          key={task.id}
                          draggableId={task.id!}
                          index={index}
                        >

                          {(provided) => (

                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >

                              <TaskCard
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                onDelete={handleDeleteTask}
                              />

                            </div>

                          )}

                        </Draggable>

                      ))}

                    {provided.placeholder}

                  </div>

                )}

              </Droppable>

            </div>

          </DragDropContext>
        </div>

      </div>

    </div>

  </div>


);
}
