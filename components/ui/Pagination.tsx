"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  return (
    <div className="flex justify-center items-center gap-3 mt-10 mb-10">
      <button className="flex items-center gap-1 text-gray-600 hover:text-black border border-gray-300 rounded-md px-3 py-1 text-sm">
        <ChevronLeft className="w-4 h-4" />
        이전
      </button>

      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-400 text-white font-medium">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-700 font-medium">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-700 font-medium">
          3
        </button>
        <span className="text-gray-400">...</span>
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-700 font-medium">
          8
        </button>
      </div>

      <button className="flex items-center gap-1 text-gray-600 hover:text-black border border-gray-300 rounded-md px-3 py-1 text-sm">
        다음
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
