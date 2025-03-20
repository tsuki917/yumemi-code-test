import { fetcher } from "./lib/fetcher";
import Charts from "./ui/charts/Charts";
import { Options } from "highcharts";
import SelectPref from "./ui/checkbox/SelectPref";
import Header from "./ui/common/Header";
// テストデータ
const options: Options = {
  title: {
    text: "My chart",
  },
  legend: {
    align: "right",
    verticalAlign: "top",
    layout: "vertical",
  },
  series: [
    {
      type: "line",
      name: "test",
      data: [
        1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3,
      ],
    },
    {
      type: "line",
      name: "test2",
      data: [
        1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2,
      ],
    },
  ],
};

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
      <SelectPref prefs={res.result} />
      <Charts options={options} />
    </main>
  );
}
