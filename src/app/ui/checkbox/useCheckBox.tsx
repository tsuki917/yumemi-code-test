"use client";
import { JSX, useState } from "react";
import { CheckBoxList } from "./CheckBoxList";
import { Prefecture } from "../../type/types";

type UseChecksResult = [
  () => JSX.Element,
  number[],
  number | null,
  number | null,
];

export const useCheckBoxList = (prefs: Prefecture[]): UseChecksResult => {
  const [checkBoxList, setCheckBoxList] = useState(prefs.map(() => false));
  const [checkedIdList, setCheckedIdList] = useState<number[]>([]);
  const [recentCheckedId, setRecentCheckedId] = useState<number | null>(null);
  const [checkedIndex, setCheckedIndex] = useState<number | null>(null);

  const handleCheckClick = (index: number) => {
    setCheckBoxList((checks) =>
      checks.map((check, i) => (i === index ? !check : check)),
    );
  };
  // TODO: フェッチデータの変更
  const handleCheckChange = (index: number) => {
    const prefCode = index + 1;
    const x = checkedIdList.indexOf(prefCode);
    setCheckedIndex(x);
    if (x < 0) {
      setCheckedIdList((list) => [...list, prefCode]);
      setRecentCheckedId(prefCode * -1);
    } else {
      setCheckedIdList(() => {
        const c = [...checkedIdList];
        c.splice(x, 1);
        return c;
      });
      setRecentCheckedId(prefCode);
    }
  };
  const renderCheckBoxList = () => (
    <CheckBoxList
      checkBoxList={checkBoxList}
      prefs={prefs}
      onCheck={handleCheckClick}
      onChange={handleCheckChange}
    />
  );

  return [renderCheckBoxList, checkedIdList, recentCheckedId, checkedIndex];
};
