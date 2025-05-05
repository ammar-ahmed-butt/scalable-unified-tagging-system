
import React from "react";
import InteractiveChart from "./InteractiveChart";
import { useTheme } from "@/contexts/ThemeContext";

interface InteractiveChartWrapperProps {
  title: string;
  data: any[];
  type: "line" | "bar" | "area";
  color?: string;
  additionalDataKeys?: string[];
  className?: string;
}

const InteractiveChartWrapper: React.FC<InteractiveChartWrapperProps> = ({
  title,
  data,
  type,
  additionalDataKeys = [],
  className,
}) => {
  const { colorScheme } = useTheme();
  
  // Define colors based on theme
  const getColor = () => {
    switch (colorScheme) {
      case "purple":
        return "#9b87f5";
      case "blue":
        return "#0ea5e9";
      case "green":
        return "#10b981";
      default:
        return "#14b8a6"; // Default teal
    }
  };

  return (
    <InteractiveChart
      title={title}
      data={data}
      type={type}
      color={getColor()}
      additionalDataKeys={additionalDataKeys}
      className={className}
    />
  );
};

export default InteractiveChartWrapper;
