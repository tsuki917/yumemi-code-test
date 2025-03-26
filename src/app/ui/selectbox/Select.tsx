type Props = {
  select: number;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const selectionData = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

export default function Select({ select, handleChange }: Props) {
  return (
    <select
      className="text-black rounded-xl my-1 px-2 py-1 outline-1"
      value={select}
      onChange={handleChange}
    >
      {selectionData.map((data, index) => {
        return (
          <option key={data} value={index}>
            {data}
          </option>
        );
      })}
    </select>
  );
}
