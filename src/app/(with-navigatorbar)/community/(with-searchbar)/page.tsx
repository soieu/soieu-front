"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BoardPreviewColumn from "@/components/board-preview-column";

export default function Page() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwt");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/boards?page=${page}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("API 요청 중 오류 발생:", err);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchData();
  }, [page]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      {data.map((boardPreview, i) => (
        <BoardPreviewColumn key={i} {...boardPreview} />
      ))}
    </div>
  );
}
