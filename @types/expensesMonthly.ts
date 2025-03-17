interface Results {
  value: any;
  label: string;
}

interface ILineGraphData {
  results: Results[];
  currentYearTotal: number;
  lastYearTotal: number;
  percentageChange: number;
}

export { ILineGraphData, Results };
