// import { cookies } from "next/headers";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const jwtToken = cookies().get("jwt")?.value;
  const id = (await params).id;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/boards/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return (
      <div>
        <h1>Error</h1>
        <p>Unable to fetch data for the board with ID: {id}</p>
      </div>
    );
  }

  const boardData = await response.json();

  return (
    <div>
      <h1>{boardData.title}</h1>
      <p>{boardData.createdDate}</p>
      <p>{boardData.content}</p>
    </div>
  );
}
