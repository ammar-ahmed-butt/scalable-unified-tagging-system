import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import SearchTags from "../components/SearchTags";
import { DateRangePicker } from "../components/DateRangePicker";
import FilterTags from "../components/FilterTags";
import InteractiveChartWrapper from "../components/InteractiveChartWrapper";
import SpiderChart from "../components/SpiderChart";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { PlusCircle, TrendingUp, User, Calendar, Briefcase, Tag as TagIcon } from "lucide-react";
import { cn } from "../lib/utils";

// (rest of the Dashboard component code remains unchanged)
const generateChartData = (days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.floor(Math.random() * 100) + 50,
      engagement: Math.floor(Math.random() * 80) + 20,
      dateObj: date
    });
  }
  
  return data;
};

// (rest of the Dashboard component code continues unchanged...)

export default Dashboard;
