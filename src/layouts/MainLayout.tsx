import { Container } from "@mui/material";
import ChartContainer from "../components/charts/ChartContainer";
import EnhancedTable from "../components/table/EnhancedTable";
import { useTasksContext } from "../hooks/useTaskContext";

const MainLayout = () => {
  const { tasks } = useTasksContext();

  return (
    <Container maxWidth="xl" className="flex flex-col h-screen overflow-hidden">
      <ChartContainer tasks={tasks} />
      <EnhancedTable />
    </Container>
  );
};

export default MainLayout;
