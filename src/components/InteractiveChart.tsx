
import React, { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, PlusCircle, BarChart2, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface InteractiveChartProps {
  title: string;
  data: ChartData[];
  type?: "area" | "bar" | "line" | "pie";
  color?: string;
  additionalDataKeys?: string[];
  showLegend?: boolean;
  className?: string;
}

const InteractiveChart: React.FC<InteractiveChartProps> = ({
  title,
  data,
  type = "line",
  color = "#0ea5e9",
  additionalDataKeys = [],
  showLegend = true,
  className
}) => {
  const [chartType, setChartType] = useState<"area" | "bar" | "line" | "pie">(type);
  const [activePoint, setActivePoint] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Colors for multiple data series
  const colors = ["#0ea5e9", "#10b981", "#8b5cf6", "#f97316", "#ec4899"];

  // Dummy function to simulate data refresh
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Function to handle chart point hover/click
  // Fixed to use the correct activeDot prop for recharts
  const handlePointClick = (payload: any) => {
    if (payload && payload.payload) {
      setActivePoint(payload.payload);
      console.log("Chart point clicked:", payload.payload);
    }
  };

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/90 backdrop-blur-sm border border-border p-2 rounded shadow-md text-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Render the appropriate chart based on chartType
  const renderChart = () => {
    switch (chartType) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
                {additionalDataKeys.map((key, index) => (
                  <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
              <XAxis dataKey="name" className="text-xs text-muted-foreground" />
              <YAxis className="text-xs text-muted-foreground" />
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend />}
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                fillOpacity={1}
                fill="url(#colorValue)"
                activeDot={{ 
                  onClick: handlePointClick,
                  r: 6 
                }}
              />
              {additionalDataKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fillOpacity={1}
                  fill={`url(#color${key})`}
                  activeDot={{ 
                    onClick: handlePointClick,
                    r: 6 
                  }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
              <XAxis dataKey="name" className="text-xs text-muted-foreground" />
              <YAxis className="text-xs text-muted-foreground" />
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend />}
              <Bar
                dataKey="value"
                fill={color}
                radius={[4, 4, 0, 0]}
                onClick={handlePointClick}
              />
              {additionalDataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                  onClick={handlePointClick}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onClick={handlePointClick}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    className="stroke-background"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );
      case "line":
      default:
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
              <XAxis dataKey="name" className="text-xs text-muted-foreground" />
              <YAxis className="text-xs text-muted-foreground" />
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend />}
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                activeDot={{ 
                  onClick: handlePointClick,
                  r: 6 
                }}
                strokeWidth={2}
              />
              {additionalDataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  activeDot={{ 
                    onClick: handlePointClick,
                    r: 6 
                  }}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <Card className={cn("chart-card overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              chartType === "line" && "bg-muted text-muted-foreground"
            )}
            onClick={() => setChartType("line")}
            title="Line Chart"
          >
            <LineChartIcon size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              chartType === "bar" && "bg-muted text-muted-foreground"
            )}
            onClick={() => setChartType("bar")}
            title="Bar Chart"
          >
            <BarChart2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              chartType === "area" && "bg-muted text-muted-foreground"
            )}
            onClick={() => setChartType("area")}
            title="Area Chart"
          >
            <PieChartIcon size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={refreshData}
            disabled={isLoading}
            title="Refresh Data"
          >
            <RefreshCw size={16} className={cn(isLoading && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {renderChart()}
        
        {activePoint && (
          <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
            <p className="font-medium">{activePoint.name}</p>
            <p>Value: {activePoint.value}</p>
            {additionalDataKeys.map(key => 
              activePoint[key] !== undefined && (
                <p key={key}>{key}: {activePoint[key]}</p>
              )
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveChart;
