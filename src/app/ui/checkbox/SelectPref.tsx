"use client";
import { Prefecture } from "@/app/type/types";
import { useCheckBoxList } from "./useCheckBox";
const data: Prefecture[] = [
  {
    prefCode: 1,
    prefName: "北海道",
  },
  {
    prefCode: 2,
    prefName: "青森県",
  },
  {
    prefCode: 3,
    prefName: "岩手県",
  },
];
export default function SelectPref() {
  const renderCheckBoxList = useCheckBoxList(data);
  return (
    <div className="w-1/2 mx-auto mt-2">
      <h2 className="text-xl font-bold mb-2">都道府県を選択</h2>
      {renderCheckBoxList()}
    </div>
  );
}
