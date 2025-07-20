"use client";
import { Suspense } from "react";

export default function PoetryLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="mt-32 text-center text-gray-600 font-medium">
          Loading poetry...
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
