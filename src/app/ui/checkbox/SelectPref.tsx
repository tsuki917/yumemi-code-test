"use client";
import { Prefecture } from "@/app/type/types";
import { useCheckBoxList } from "./useCheckBox";

type Props = {
  prefs: Prefecture[];
};

export default function SelectPref({ prefs }: Props) {
  const renderCheckBoxList = useCheckBoxList(prefs);
  return (
    <div className="w-1/2 mx-auto mt-2">
      <h2 className="text-xl font-bold mb-2">都道府県を選択</h2>
      {renderCheckBoxList()}
    </div>
  );
}
