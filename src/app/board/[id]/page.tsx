export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <div>board info : {id}</div>;
}