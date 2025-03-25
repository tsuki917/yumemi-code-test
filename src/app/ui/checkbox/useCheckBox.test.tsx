import { renderHook, act, waitFor } from "@testing-library/react";
import { useCheckBoxList } from "./useCheckBox";
import { Prefecture } from "@/app/type/types";

describe("useCheckBoxListカスタムフック", () => {
  const mockPrefs: Prefecture[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
  ];

  test("初期状態が正しいことを確認", () => {
    const { result } = renderHook(() => useCheckBoxList(mockPrefs));

    expect(result.current[1]).toEqual([]); // checkedIdList
    expect(result.current[2]).toBeNull(); // recentCheckedId
    expect(result.current[3]).toBeNull(); // checkedIndex
  });

  test("チェックボックスのクリックと状態の変化", async () => {
    const { result } = renderHook(() => useCheckBoxList(mockPrefs));

    // 1つ目のチェックボックスのON/OFF
    act(() => {
      result.current[0]().props.onCheck(0);
    });

    // 1つ目のチェックボックスの変更を適用
    act(() => {
      result.current[0]().props.onChange(0);
    });

    await waitFor(() => {
      expect(result.current[1]).toEqual([1]);
    });

    // `recentCheckedId` の値が更新されていることを確認
    expect(result.current[2]).toBe(-1);
  });
});
