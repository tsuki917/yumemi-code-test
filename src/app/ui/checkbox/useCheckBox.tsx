"use client";
import { JSX, useState } from "react";
import { CheckBoxList } from "./CheckBoxList";
import { Prefecture } from "../../type/types";

type UseChecksResult = () => JSX.Element;

export const useCheckBoxList = (prefs: Prefecture[]): UseChecksResult => {
  const [checkBoxList, setCheckBoxList] = useState(() =>
    prefs.map(() => false),
  );

  const handleCheckClick = (index: number) => {
    setCheckBoxList((checks) =>
      checks.map((check, i) => (i === index ? !check : check)),
    );
  };
  // TODO: フェッチデータの変更
  const handleCheckChange = () => {};
  const renderCheckBoxList = () => (
    <CheckBoxList
      checkBoxList={checkBoxList}
      prefs={prefs}
      onCheck={handleCheckClick}
      onChange={handleCheckChange}
    />
  );

  return renderCheckBoxList;
};
