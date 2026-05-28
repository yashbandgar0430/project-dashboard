"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TaskBarChart() {
  const data = [
    { name: "Mon", tasks: 4 },
    { name: "Tue", tasks: 7 },
    { name: "Wed", tasks: 3 },
    { name: "Thu", tasks: 8 },
    { name: "Fri", tasks: 5 },
    { name: "Sat", tasks: 6 },
    { name: "Sun", tasks: 2 },
  ];

  return (
    <div className="bg-[#1e293b] p-4 rounded-2xl shadow-xl w-full">

      <h2 className="text-white font-bold mb-4">
        Weekly Activity
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Bar dataKey="tasks" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}