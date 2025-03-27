import { renderHook, act } from "@testing-library/react";
import { useFetchWithStateData } from "./useFetchWithStateData";
import { fetcher } from "../lib/fetcher";
import { PopulationCompositionPerYear } from "../type/types";

// fetcher をモック
jest.mock("../lib/fetcher");

// Props の型を定義
type Props = {
  recentCheckedId: number | null;
  checkedIndex: number | null;
};

describe("useFetchWithStateData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("新しい都道府県のデータを取得して chartsData に追加する", async () => {
    const mockData: PopulationCompositionPerYear = {
      boundaryYear: 2020,
      data: [
        { label: "総人口", data: [{ year: 2020, value: 1000000, rate: 0 }] },
      ],
    };

    (fetcher as jest.Mock).mockResolvedValue({ result: mockData });

    // 初期状態でフックを実行
    const initialProps: Props = { recentCheckedId: null, checkedIndex: null };

    const { result, rerender } = renderHook(
      ({ recentCheckedId, checkedIndex }) =>
        useFetchWithStateData(recentCheckedId, checkedIndex),
      { initialProps },
    );

    expect(result.current).toEqual([]);

    // recentCheckedId を -1（チェックした）に変更
    rerender({ recentCheckedId: -1, checkedIndex: 0 });

    // 非同期のデータ取得を待つ
    await act(async () => {});

    // データが追加される
    expect(result.current).toEqual([mockData]);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("チェックを外したらデータを削除する", async () => {
    const mockData: PopulationCompositionPerYear = {
      boundaryYear: 2020,
      data: [
        { label: "総人口", data: [{ year: 2020, value: 1000000, rate: 0 }] },
      ],
    };

    (fetcher as jest.Mock).mockResolvedValue({ result: mockData });

    const initialProps: Props = { recentCheckedId: -1, checkedIndex: 0 };

    const { result, rerender } = renderHook(
      ({ recentCheckedId, checkedIndex }) =>
        useFetchWithStateData(recentCheckedId, checkedIndex),
      { initialProps },
    );

    // データ取得を待つ
    await act(async () => {});

    expect(result.current).toEqual([mockData]);

    // チェックを外す (recentCheckedId を 1 に変更)
    rerender({ recentCheckedId: 1, checkedIndex: 0 });

    // データが削除される
    expect(result.current).toEqual([]);
  });

  it("無効な recentCheckedId または checkedIndex の場合は API を呼ばない", async () => {
    const initialProps: Props = { recentCheckedId: null, checkedIndex: null };

    const { rerender } = renderHook(
      ({ recentCheckedId, checkedIndex }) =>
        useFetchWithStateData(recentCheckedId, checkedIndex),
      { initialProps },
    );

    // API は呼ばれていないことを確認
    expect(fetcher).not.toHaveBeenCalled();

    rerender({ recentCheckedId: null, checkedIndex: 1 });
    expect(fetcher).not.toHaveBeenCalled();

    rerender({ recentCheckedId: 1, checkedIndex: null });
    expect(fetcher).not.toHaveBeenCalled();
  });
});
