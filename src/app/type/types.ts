export type Prefecture = {
  prefCode: number;
  prefName: string;
};

type PopulationCompositionPerYearData = {
  year: number;
  value: number;
  rate: number;
};

type PopulationCompositionPerYearEachData = {
  label: string;
  data: PopulationCompositionPerYearData[];
};

export type PopulationCompositionPerYear = {
  boundaryYear: number;
  data: PopulationCompositionPerYearEachData[];
};
