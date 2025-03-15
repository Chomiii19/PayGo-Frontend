import { PieChart } from "react-native-gifted-charts";
import { Text } from "react-native";

const LoanChart = () => {
  const pieData = [
    { value: 90, color: "#177AD5" },
    { value: 10, color: "transparent" },
  ];
  return (
    <PieChart
      donut
      innerRadius={30}
      isAnimated
      animationDuration={300}
      radius={40}
      data={pieData}
      innerCircleColor={"#1D1E27"}
      showTextBackground={false}
      centerLabelComponent={() => {
        return <Text className="font-rBold text-lg text-zinc-200">90%</Text>;
      }}
    />
  );
};

export default LoanChart;
