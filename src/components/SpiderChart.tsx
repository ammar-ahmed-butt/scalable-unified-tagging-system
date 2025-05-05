
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

interface SpiderChartProps {
  data: {
    name: string;
    value: number;
  }[];
  title: string;
}

const SpiderChart: React.FC<SpiderChartProps> = ({ data, title }) => {
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Tags Usage"
                dataKey="value"
                stroke={getColor()}
                fill={getColor()}
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpiderChart;
