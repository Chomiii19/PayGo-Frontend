import { BarChart } from "react-native-gifted-charts";

function TransactionsOverviewGraph() {
  const barData = [
    { value: 23091, label: "Transfer", frontColor: "#eab308" },
    { value: 47980, label: "Receive", frontColor: "#177AD5" },
    { value: 2010, label: "Load", frontColor: "#a855f7" },
    { value: 10201, label: "Bills", frontColor: "#f87171" },
    { value: 16800, label: "Loan", frontColor: "#22c55e" },
  ];
  return (
    <BarChart
      barWidth={40}
      noOfSections={5}
      barBorderRadius={4}
      frontColor="lightgray"
      color={"#177AD5"}
      data={barData}
      yAxisThickness={0}
      xAxisThickness={0}
      isAnimated
      animationDuration={1000}
      yAxisLabelTexts={["0", "10k", "20k", "30k", "40k", "50k"]}
      width={500}
      spacing={24}
      xAxisLabelTextStyle={{ color: "#71717a" }}
      yAxisTextStyle={{ color: "#71717a" }}
      hideRules
    />
  );
}

export default TransactionsOverviewGraph;
