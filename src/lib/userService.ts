import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const getUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};