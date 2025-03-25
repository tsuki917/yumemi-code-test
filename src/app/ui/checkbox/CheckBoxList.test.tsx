import { render, screen, fireEvent } from "@testing-library/react";
import { CheckBoxList } from "./CheckBoxList";
import { Prefecture } from "@/app/type/types";

describe("CheckBoxListコンポーネント", () => {
  const mockOnCheck = jest.fn();
  const mockOnChange = jest.fn();

  const mockPrefs: Prefecture[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
  ];

  test("チェックボックスのレンダリングとクリック動作の確認", () => {
    const checkBoxList = [false, false];

    render(
      <CheckBoxList
        checkBoxList={checkBoxList}
        prefs={mockPrefs}
        onCheck={mockOnCheck}
        onChange={mockOnChange}
      />,
    );

    // チェックボックスとラベル要素を取得
    const checkboxes = screen.getAllByRole("checkbox");
    const firstLabel = screen.getByText("北海道").closest("label");
    const secondLabel = screen.getByText("青森県").closest("label");

    // 初期状態でラベルのクラスが bg-off であることを確認
    expect(firstLabel).toHaveClass("bg-off");
    expect(secondLabel).toHaveClass("bg-off");

    // 最初のチェックボックスをクリック
    fireEvent.click(checkboxes[0]);

    // onCheckが呼ばれたことを確認
    expect(mockOnCheck).toHaveBeenCalledWith(0);

    // onChange も発火されるかテスト
    fireEvent.change(checkboxes[0]);
    expect(mockOnChange).toHaveBeenCalledWith(0);
  });

  test("チェックされたチェックボックスのラベル背景色が変更される", () => {
    // 1つ目のチェックボックスがONの状態
    const checkBoxList = [true, false];

    render(
      <CheckBoxList
        checkBoxList={checkBoxList}
        prefs={mockPrefs}
        onCheck={mockOnCheck}
        onChange={mockOnChange}
      />,
    );

    // ラベル要素を取得
    const firstLabel = screen.getByText("北海道").closest("label");
    const secondLabel = screen.getByText("青森県").closest("label");

    // 1つ目のチェックボックスのラベルが "bg-primary" になっていることを確認
    expect(firstLabel).toHaveClass("bg-primary");

    // 2つ目のチェックボックスのラベルは "bg-off" のままであることを確認
    expect(secondLabel).toHaveClass("bg-off");
  });
});
