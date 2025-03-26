"use client";
import { PopulationCompositionPerYear, Prefecture } from "@/app/type/types";
import Charts from "./Charts";
import SelectPref from "./SelectPref";
import { useCheckBoxList } from "./checkbox/useCheckBox";
import { Options } from "highcharts";
import { useFetchWithStateData } from "./useFetchWithStateData";
import { useChartOptions } from "./useChartOptions";
import { useState } from "react";
import Select from "./selectbox/Select";

type Props = {
  prefs: Prefecture[];
};

export default function DisplayComposition({ prefs }: Props) {
  const [renderCheckBoxList, checkedIdList, checkedId, checkedIndex] =
    useCheckBoxList(prefs);
  const [selectedDataIndex, setSelectedDataIndex] = useState<number>(0);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDataIndex(parseInt(e.target.value));
  };
  const chartData: PopulationCompositionPerYear[] = useFetchWithStateData(
    checkedId,
    checkedIndex,
  );
  const options: Options | null = useChartOptions(
    chartData,
    prefs,
    checkedIdList,
    selectedDataIndex,
  );

  return (
    <div>
      <SelectPref renderCheckBoxList={renderCheckBoxList} />
      <div className="w-2/3 mx-auto mt-2">
        <h2 className="text-primary text-xl font-bold mb-2">人口構成グラフ</h2>
        <Select select={selectedDataIndex} handleChange={handleChange} />
        {options && <Charts options={options} />}
      </div>
    </div>
  );
}
