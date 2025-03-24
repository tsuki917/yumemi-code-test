"use client";
import { PopulationCompositionPerYear, Prefecture } from "@/app/type/types";
import Charts from "./Charts";
import SelectPref from "./SelectPref";
import { useCheckBoxList } from "./checkbox/useCheckBox";
import { Options } from "highcharts";
import { useFetchWithStateData } from "./useFetchWithStateData";
import { useChartOptions } from "./useChartOptions";

type Props = {
  prefs: Prefecture[];
};

export default function DisplayComposition({ prefs }: Props) {
  const [renderCheckBoxList, checkedIdList, checkedId, checkedIndex] =
    useCheckBoxList(prefs);
  const chartData: PopulationCompositionPerYear[] = useFetchWithStateData(
    checkedId,
    checkedIndex,
  );
  const options: Options | null = useChartOptions(
    chartData,
    prefs,
    checkedIdList,
  );

  return (
    <div>
      <SelectPref renderCheckBoxList={renderCheckBoxList} />
      {options && <Charts options={options} />}
    </div>
  );
}
