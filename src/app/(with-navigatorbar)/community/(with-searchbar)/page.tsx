// import { cookies } from "next/headers";
import { BoardPreviewData } from "@/app/types";
import BoardPreviewColumn from "@/components/board-preview-column";
import { headers } from "next/headers";

export default async function Page() {
  // const cookieStore = await cookies();
  // const jwtToken = cookieStore.get("jwt")?.value;

  // if (!jwtToken) {
  //   console.error("No JWT token found in cookies");
  //   return <div>Error: No authorization token</div>;
  // }

  // headers() 함수 호출에 await 추가
  console.log("test");
  const referer = (await headers()).get("referer") || "";
  const url = new URL(referer);
  const page = url.searchParams.get("page") || "1"; // 기본값을 "1"로 설정

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/boards?page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  console.log(response);
  if (!response.ok) {
    console.error("Failed to fetch data");
    return <div>Error loading boards</div>;
  }

  const data = await response.json();

  return (
    <div>
      {data.map((boardPreview: BoardPreviewData, i: number) => (
        <BoardPreviewColumn key={i} {...boardPreview} />
      ))}
    </div>
  );
}
