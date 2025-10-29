import { Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { MONTHS_ABBR } from "../../constants/months";
import type { Task } from "../../types/task";

interface DueDateChartProps {
  tasks: Task[];
}

interface MonthDataInterface {
  value: number;
  month: string;
  year: string;
}

const DueDateChart = ({ tasks }: DueDateChartProps) => {
  const formatDate = (dueDate: Date | undefined) => {
    if (dueDate === undefined) {
      return;
    }

    const month = dueDate.toLocaleString("en-gb", { month: "short" });
    const year = dueDate.getFullYear().toString();
    return `${month}-${year}`;
  };

  const sortByMonth = (arr: MonthDataInterface[]) => {
    arr.sort(
      (a, b) =>
        Number(a.year) - Number(b.year) ||
        MONTHS_ABBR.indexOf(a.month) - MONTHS_ABBR.indexOf(b.month),
    );
  };

  const monthCount: Record<string, number> = {};
  tasks.forEach((task) => {
    const key = formatDate(task.due_date) ?? "N/A";
    monthCount[key] = (monthCount[key] ?? 0) + 1;
  });

  const monthData = [];
  for (const key in monthCount) {
    monthData.push({
      value: monthCount[key],
      month: key.split("-")[0],
      year: key.split("-")[1],
    });
  }

  sortByMonth(monthData);

  const settings = {
    margin: { right: 5 },
    height: 300,
    hideLegend: true,
  };

  return (
    <Paper className="flex flex-col grow p-5">
      <Typography variant="h6">Due Date Breakdown</Typography>
      <BarChart
        dataset={monthData}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[{ dataKey: "value", label: "number" }]}
        {...settings}
      />
    </Paper>
  );
};

export default DueDateChart;
