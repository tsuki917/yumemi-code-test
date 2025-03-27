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
      <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full md:gap-0.5 rounded-4xl">
        {prefs.map((pref, index) => (
          <li key={index}>
            <label
              className={`block ${checkBoxList[index] ? "bg-primary" : "bg-off"} px-4 py-2 text-center font-bold`}
            >
              <input
                type="checkbox"
                className="appearance-none"
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
