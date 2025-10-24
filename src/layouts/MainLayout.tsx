import { Container, Paper } from "@mui/material";
import ChartContainer from "../components/charts/ChartContainer";
import EnhancedTable from "../components/table/EnhancedTable";
import { useTasksContext } from "../hooks/useTaskContext";

const MainLayout = () => {
  const { tasks } = useTasksContext();

  return (
    <Container className="flex flex-col">
      <ChartContainer tasks={tasks} />
      <Paper className="p-5 pt-0 mx-5">
        <EnhancedTable />
      </Paper>
    </Container>
  );
};

export default MainLayout;
