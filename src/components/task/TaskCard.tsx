"use client";

import { FiTrash2 } from "react-icons/fi";

interface Props {
  id?: string;
  title: string;
  description: string;
  priority?: string;
  onDelete?: (id: string) => void;
}

export default function TaskCard({
  id,
  title,
  description,
  priority,
  onDelete,
}: Props) {

  return (

    <div className="bg-[#334155] border border-slate-500 rounded-2xl p-5 mb-4 shadow-md hover:scale-[1.02] transition-all duration-300">

      <div className="flex items-start justify-between gap-4">

        <div>

          <h3 className="text-white font-semibold text-lg">
            {title}
          </h3>
          {/* PRIORITY BADGE */}
          {priority && (
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium
        ${priority === "high"
                  ? "bg-red-500 text-white"
                  : priority === "medium"
                    ? "bg-yellow-500 text-black"
                    : "bg-green-500 text-white"
                }
      `}
            >
              {priority}
            </span>
          )}
          <p className="text-gray-300 mt-2 text-sm">
            {description}
          </p>

        </div>

        {/* DELETE BUTTON */}

        <button
          onClick={() => onDelete?.(id!)}
          className="text-red-400 hover:text-red-500 transition-all duration-300"
        >
          <FiTrash2 size={20} />
        </button>

      </div>

    </div>

  );

}