"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const createBoard = async () => {
    try {
      console.log("게시글 생성 요청 시작:", { title, content });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/boards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        }
      );

      console.log("응답 상태 코드:", response.status);
      console.log("응답 상태 텍스트:", response.statusText);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("게시글 생성 성공:", result);

      router.push(`/boards/${result.id}`);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <textarea
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>
      <textarea
        placeholder="콘텐츠를 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={createBoard}>Click</button>
    </div>
  );
}
