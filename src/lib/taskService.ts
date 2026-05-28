import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

import { Task } from "@/types/task";

const taskCollection = collection(db, "tasks");

export const addTask = async (task: Omit<Task, "id">) => {
  await addDoc(taskCollection, task);
};

export const getTasks = async () => {

  const snapshot = await getDocs(taskCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

};

export const updateTaskStatus = async (
  id: string,
  status: string
) => {

  const taskRef = doc(db, "tasks", id);

  await updateDoc(taskRef, {
    status,
  });

};