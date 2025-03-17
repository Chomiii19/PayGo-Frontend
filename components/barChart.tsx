import { BarChart } from "react-native-gifted-charts";
import IBarGraphData from "../@types/barGraphInterface";

function TransactionsOverviewGraph({
  barGraphData,
}: {
  barGraphData: IBarGraphData[];
}) {
  return (
    <BarChart
      barWidth={40}
      noOfSections={5}
      barBorderRadius={4}
      frontColor="lightgray"
      color={"#177AD5"}
      data={barGraphData}
      yAxisThickness={0}
      xAxisThickness={0}
      isAnimated
      animationDuration={1000}
      width={500}
      yAxisLabelTexts={createYAxisLabels(barGraphData)}
      spacing={24}
      xAxisLabelTextStyle={{ color: "#71717a" }}
      yAxisTextStyle={{ color: "#71717a" }}
      hideRules
    />
  );
}

const createYAxisLabels = (data: IBarGraphData[]): string[] => {
  const maxValue = Math.max(...data.map((item) => item.value));

  const roundedMax =
    maxValue < 1000
      ? Math.ceil(maxValue / 100) * 100
      : Math.ceil(maxValue / 1000) * 1000;

  const labels = [];
  for (let i = 0; i <= 5; i++) {
    const labelValue = (roundedMax / 5) * i;
    labels.push(labelValue >= 1000 ? `${labelValue / 1000}k` : `${labelValue}`);
  }

  return labels;
};

export default TransactionsOverviewGraph;
