import { LineChart } from "react-native-gifted-charts";
import { Results } from "../@types/expensesMonthly";

const TotalExpensesGraph = ({ data }: { data: Results[] }) => {
  return (
    <LineChart
      data={data}
      curved
      color="#2682FF"
      hideRules
      xAxisLabelTextStyle={{ color: "#71717a" }}
      yAxisTextStyle={{ color: "#71717a" }}
      yAxisColor={"transparent"}
      xAxisColor={"transparent"}
      hideDataPoints
      focusEnabled
      xAxisIndicesColor={"#2682FF"}
      isAnimated
      animateOnDataChange
      animationDuration={1000}
      noOfSections={4}
      yAxisLabelTexts={createYAxisLabels(data)}
      startFillColor="#2682FF"
      endFillColor="#2682FF"
      startOpacity={0.3}
      endOpacity={0.0}
      areaChart
    />
  );
};

const createYAxisLabels = (data: Results[]): string[] => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const step = Math.ceil(maxValue / 5);

  const labels: string[] = [];

  for (let i = 0; i < 4; i++) {
    const labelValue = step * i;
    labels.push(
      labelValue >= 1000
        ? `${(labelValue / 1000).toFixed(0)}k`
        : `${labelValue}`
    );
  }

  labels.push(String(maxValue));

  return labels;
};

export default TotalExpensesGraph;
