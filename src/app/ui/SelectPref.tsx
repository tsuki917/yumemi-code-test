"use client";
import { JSX } from "react";

type Props = {
  renderCheckBoxList: () => JSX.Element;
};

export default function SelectPref({ renderCheckBoxList }: Props) {
  return (
    <div className="w-2/3 mx-auto mt-2">
      <h2 className="text-primary text-xl font-bold mb-2">都道府県を選択</h2>
      {renderCheckBoxList()}
    </div>
  );
}
