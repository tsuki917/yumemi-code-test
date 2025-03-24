"use client";

import { useEffect, useState } from "react";
import { PopulationCompositionPerYear } from "../type/types";
import { fetcher } from "../lib/fetcher";

export const useFetchWithStateData = (
  recentCheckedId: number | null,
  checkedIndex: number | null,
): PopulationCompositionPerYear[] => {
  const [chartsData, setChartsData] = useState<PopulationCompositionPerYear[]>(
    [],
  );
  useEffect(() => {
    const fetchPopulationData = async () => {
      if (recentCheckedId == null || checkedIndex == null) return;
      if (recentCheckedId < 0) {
        const prefCode = -recentCheckedId;
        const res = await fetcher(
          `/api/v1/population/composition/perYear?prefCode=${prefCode}`,
          {
            headers: {
              "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY ?? "",
              "Content-Type": "application/json; charset=UTF-8",
            },
            next: {
              revalidate: 3600,
            },
          },
        );
        setChartsData([...chartsData, res.result]);
      } else {
        setChartsData(() => {
          const p = [...chartsData];
          p.splice(checkedIndex, 1);
          return p;
        });
      }
    };
    fetchPopulationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedIndex, recentCheckedId]);

  return chartsData;
};
