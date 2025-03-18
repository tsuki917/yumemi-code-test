import { Prefecture } from "@/app/type/types";

type Props = {
  checkBoxList: boolean[];
  prefs: Prefecture[];
  onCheck: (index: number) => void;
  onChange: (index: number) => void;
};

export const CheckBoxList = ({
  checkBoxList,
  prefs,
  onCheck,
  onChange,
}: Props) => {
  return (
    <div className="flex justify-center">
      <ul className="grid grid-cols-4 w-full border">
        {prefs.map((pref, index) => (
          <li key={index} className="border px-4 py-2">
            <label className="block">
              <input
                type="checkbox"
                checked={checkBoxList[index]}
                onClick={() => onCheck(index)}
                onChange={() => onChange(index)}
              />
              {pref.prefName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
