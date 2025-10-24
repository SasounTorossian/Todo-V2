import { Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import type { Task } from "../../types/task";
import { STATUSES } from "../../types/task";

interface StatusChartProps {
  tasks: Task[];
}

const StatusChart = ({ tasks }: StatusChartProps) => {
  const countStatus = (label: string) => {
    return tasks.reduce(
      (acc, curr) => (curr.status.label == label ? (acc += 1) : acc),
      0,
    );
  };

  const statusData = STATUSES.filter(
    (status) => countStatus(status.label) > 0,
  ).map((status) => ({
    label: status.label,
    value: countStatus(status.label),
    color: status.colour,
  }));

  const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: false,
    loading: tasks.length == 0,
  };

  return (
    <Paper className="flex flex-col grow p-5">
      <Typography variant="h6">Status Breakdown</Typography>
      <PieChart
        series={[
          {
            innerRadius: 0,
            outerRadius: 100,
            data: statusData,
            arcLabel: (item) => `${item.value}`,
            arcLabelRadius: "60%",
          },
        ]}
        {...settings}
      />
    </Paper>
  );
};

export default StatusChart;
