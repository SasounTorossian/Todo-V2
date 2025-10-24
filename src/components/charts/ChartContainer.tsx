import { Container } from "@mui/material";
import type { Task } from "../../types/task";
import DueDateChart from "./DueDateChart";
import PriorityChart from "./PriorityChart";
import StatusChart from "./StatusChart";

interface ChartContainerProps {
  tasks: Task[];
}

const ChartContainer = ({ tasks }: ChartContainerProps) => {
  return (
    <Container className="flex py-15">
      <PriorityChart tasks={tasks} />
      <StatusChart tasks={tasks} />
      <DueDateChart tasks={tasks} />
    </Container>
  );
};

export default ChartContainer;
