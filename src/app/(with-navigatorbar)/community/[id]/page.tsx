"use client"; // 클라이언트 컴포넌트로 설정

import { useEffect, useState } from "react";

// TODO useEffect로 데이터 불러오는거 싫음 ㅜㅜ
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [boardData, setBoardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwt"); // 클라이언트 측에서 JWT 가져오기

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/boards/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`, // JWT를 Authorization 헤더에 추가
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBoardData(data);
      } catch (err) {
        console.error("Error fetching board data:", err);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!boardData) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div>{boardData.title}</div>
      <div>{boardData.createdDate}</div>
      <div>{boardData.content}</div>
    </>
  );
}
