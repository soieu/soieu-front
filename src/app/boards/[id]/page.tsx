export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const boardData = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/boards/${id}`
  ).then((res) => res.json());
  return (
    <>
      <div>{boardData.title}</div>
      <div>{boardData.createdDate}</div>
      <div>{boardData.content}</div>
    </>
  );
}
