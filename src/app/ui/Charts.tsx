"use client";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
type Props = {
  options: Highcharts.Options;
};

export default function Charts({ options }: Props) {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
