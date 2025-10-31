import { Box } from "@mui/material";
import type { Task } from "../../types/task";
import DueDateChart from "./DueDateChart";
import PriorityChart from "./PriorityChart";
import StatusChart from "./StatusChart";

interface ChartContainerProps {
  tasks: Task[];
}

const ChartContainer = ({ tasks }: ChartContainerProps) => {
  return (
    <Box className="flex gap-3">
      <PriorityChart tasks={tasks} />
      <StatusChart tasks={tasks} />
      <DueDateChart tasks={tasks} />
    </Box>
  );
};

export default ChartContainer;
