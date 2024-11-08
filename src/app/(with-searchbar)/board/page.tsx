"use client";
import { useState, useEffect } from "react";
import BoardPreviewColumn from "@/components/board-preview-column";

export default function Home() {
  const [boardsPreview, setBoardsPreview] = useState([]);

  const fetchBoards = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/board`
    );
    const data = await response.json();
    setBoardsPreview(data);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div>
      {boardsPreview.map((boardPreview: BoardPreviewData, i) => (
        <BoardPreviewColumn key={i} {...boardPreview} />
      ))}
    </div>
  );
}
