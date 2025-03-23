"use client";

import { Options } from "highcharts";
import { PopulationCompositionPerYear, Prefecture } from "../type/types";
import { useEffect, useState } from "react";

export const useChartOptions = (
  chartData: PopulationCompositionPerYear[],
  prefs: Prefecture[],
  checkedIdList: number[],
): Options | null => {
  const [options, setOptions] = useState<Options | null>(null);
  useEffect(() => {
    const op: Options = {
      title: {
        text: "Chart Data",
      },
      legend: {
        align: "right",
        verticalAlign: "top",
        layout: "vertical",
      },
      xAxis: {
        categories:
          chartData.length > 0
            ? chartData[0].data[0].data.map((ele) => {
                return ele.year.toString();
              })
            : [],
        title: {
          text: "年",
          align: "high",
        },
      },
      yAxis: {
        title: {
          text: "人口数",
          align: "high",
        },
      },
      series: chartData.map(
        (eachPrefData: PopulationCompositionPerYear, index) => {
          return {
            type: "line",
            name: prefs[checkedIdList[index] - 1].prefName,

            data: eachPrefData.data[0].data.map((ele) => ele.value),
          };
        },
      ),
      accessibility: {
        enabled: false,
      },
    };
    setOptions(op);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  return options;
};
