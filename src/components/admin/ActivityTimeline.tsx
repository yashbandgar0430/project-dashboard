"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Activity = {
  id: string;
  message: string;
  user: string;
  time?: number;
};

export default function ActivityTimeline() {
  const [activity, setActivity] = useState<Activity[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "activity"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Activity[];

      // latest first
      setActivity(data.reverse());
    });

    return () => unsub();
  }, []);
const getColor = (message: string) => {
  switch (message) {
    case "Task Created":
      return "bg-green-500";

    case "Task Updated":
      return "bg-yellow-500";

    case "Task Deleted":
      return "bg-red-500";

    default:
      return "bg-blue-500";
  }
};
  return (
    <div className="bg-[#1e293b] p-5 rounded-2xl shadow-xl w-full">

      {/* TITLE */}
      <h2 className="text-white font-bold mb-4">
        Activity Timeline
      </h2>

      {/* TIMELINE */}
      <div className="relative border-l border-gray-600 pl-4 space-y-6 max-h-96 overflow-y-auto">

        {activity.map((item) => (
          <div key={item.id} className="relative">

            {/* DOT */}
           <div
  className={`absolute -left-2 top-1 w-3 h-3 rounded-full ${getColor(item.message)}`}
/>

            {/* CONTENT */}
            <div className="ml-4">

              <p className="text-white text-sm font-medium">
                {item.message}
              </p>

              <p className="text-gray-400 text-xs">
                {item.user}
              </p>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}