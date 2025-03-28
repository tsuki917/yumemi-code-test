import { fetcher } from "./lib/fetcher";
import Header from "./ui/common/Header";
import Presentation from "./ui/DisplayConposition";

export default async function Home() {
  const res = await fetcher("/api/v1/prefectures", {
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY ?? "",
      "Content-Type": "application/json; charset=UTF-8",
    },
    next: {
      revalidate: 3600,
    },
  });

  return (
    <main>
      <Header />
      <Presentation prefs={res.result} />
    </main>
  );
}
