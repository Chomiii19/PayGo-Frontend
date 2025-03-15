import { LineChart } from "react-native-gifted-charts";

const TotalExpensesGraph = () => {
  const data = [
    { value: 15200, label: "Jan" },
    { value: 28988, label: "Feb" },
    { value: 12012, label: "Mar" },
    { value: 8901, label: "Apr" },
    { value: 37000, label: "May" },
    { value: 5701, label: "Jun" },
    { value: 21001, label: "Jul" },
    { value: 18091, label: "Aug" },
    { value: 17800, label: "Sep" },
    { value: 1980, label: "Oct" },
  ];

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
      yAxisLabelTexts={["0", "10k", "20k", "30k", "40k"]}
      startFillColor="#2682FF"
      endFillColor="#2682FF"
      startOpacity={0.3}
      endOpacity={0.0}
      areaChart
    />
  );
};

export default TotalExpensesGraph;
