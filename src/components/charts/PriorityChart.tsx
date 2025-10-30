import { Paper, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import type { Task } from "../../types/task";
import { PRIORITIES } from "../../types/task";

interface PriorityChartProps {
  tasks: Task[];
}

const PriorityChart = ({ tasks }: PriorityChartProps) => {
  const countPriority = (label: string) => {
    return tasks.reduce(
      (acc, curr) => (curr.priority.label == label ? (acc += 1) : acc),
      0,
    );
  };

  const priorityData = PRIORITIES.filter(
    (priority) => countPriority(priority.label) > 0,
  ).map((priority) => ({
    label: priority.label,
    value: countPriority(priority.label),
    color: priority.colour,
  }));

  const settings = {
    width: 230,
    height: 200,
    hideLegend: false,
  };

  return (
    <Paper className="flex flex-col grow py-3 px-6">
      <Typography variant="h6">Priority Breakdown</Typography>
      <PieChart
        series={[
          {
            innerRadius: 0,
            outerRadius: 100,
            data: priorityData,
            arcLabel: (item) => `${item.value}`,
            arcLabelRadius: "60%",
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "black",
          },
        }}
        {...settings}
      />
    </Paper>
  );
};

export default PriorityChart;
