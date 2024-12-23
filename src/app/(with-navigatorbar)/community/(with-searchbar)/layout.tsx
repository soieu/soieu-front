"use client";
import SearchBar from "../../../../components/search-bar";
import Link from "next/link";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>{children}</div>
      <SearchBar />
      <Link href="/boards/create">Create Board</Link>
    </div>
  );
}
