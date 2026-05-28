import { db } from "./firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

// CREATE PROJECT
export const createProject = async (data: any) => {
  await addDoc(collection(db, "projects"), {
    ...data,
    createdAt: Date.now(),
  });
};

// GET PROJECTS
export const getProjects = async () => {
  const snapshot = await getDocs(collection(db, "projects"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};