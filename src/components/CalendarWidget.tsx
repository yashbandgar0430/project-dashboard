"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarWidget() {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <div className="bg-[#1e293b] p-5 rounded-2xl shadow-xl w-full max-w-md text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-bold">
          Calendar
        </h2>

        <p className="text-blue-400 text-sm">
          {value?.toLocaleString("default", { month: "long" })}{" "}
          {value?.getFullYear()}
        </p>
      </div>

      {/* CALENDAR */}
      <div className="calendar-dark">
        <Calendar
          onChange={(val) => setValue(val as Date)}
          value={value}
        />
      </div>

    </div>
  );
}