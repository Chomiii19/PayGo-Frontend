import { PieChart } from "react-native-gifted-charts";
import { Text } from "react-native";
import ILoan from "../@types/loanInterface";
import { useActiveLoan } from "../context/activeLoanContext";

const LoanChart = ({
  innerRadius,
  innerCircleColor,
  radius,
}: {
  innerRadius: number;
  innerCircleColor: string;
  radius: number;
}) => {
  const { pieGraphData } = useActiveLoan();
  const percentagePaid = (
    (1 - (pieGraphData?.balanceRemaining || 0) / (pieGraphData?.amount || 0)) *
    100
  ).toFixed(0);

  const paidAmount =
    (pieGraphData?.amount || 0) - (pieGraphData?.balanceRemaining || 0);
  const remainingBalance = pieGraphData?.balanceRemaining || 0;

  const pieData = [
    { value: paidAmount || 0, color: "#177AD5" },
    { value: remainingBalance || 0, color: "transparent" },
  ];
  return (
    <PieChart
      donut
      innerRadius={innerRadius}
      isAnimated
      animationDuration={300}
      radius={radius}
      data={pieData}
      innerCircleBorderWidth={1}
      innerCircleBorderColor={"#27272a"}
      innerCircleColor={innerCircleColor}
      showTextBackground={false}
      centerLabelComponent={() => {
        return (
          <Text className="font-rBold text-lg text-zinc-200">
            {percentagePaid}%
          </Text>
        );
      }}
    />
  );
};

export default LoanChart;
