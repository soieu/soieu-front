"use client";
import { usePathname } from "next/navigation";

export function AnimatedLayout({ children }) {
  const pathname = usePathname();

  return (
    <div
      className={`
        border-2 border-black bg-white
        transition-all duration-500 ease-in-out
        ${pathname === "/" ? "w-[85vw] h-[85vh]" : "w-[70vw] h-[85vh]"}
      `}
    >
      {children}
    </div>
  );
}
