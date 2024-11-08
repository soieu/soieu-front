"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onSubmit = () => {
    router.push(`/board/search?query=${search}`);
  };

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <input
        className="border-s-black border-y-black border-2 border-collapse"
        value={search}
        onChange={changeSearch}
      />
      <button
        className="bg-none border-s-transparent border-2 border-e-black border-y-black border-collapse"
        onClick={onSubmit}
      >
        검색
      </button>
    </div>
  );
}
