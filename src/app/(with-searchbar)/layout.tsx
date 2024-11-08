import SearchBar from "../../components/search-bar";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>{children}</div>
      <SearchBar />
    </div>
  );
}
