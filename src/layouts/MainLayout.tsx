import { Box, Container } from "@mui/material";
import ChartContainer from "../components/charts/ChartContainer";
import Footer from "../components/footer/Footer";
import EnhancedTable from "../components/table/EnhancedTable";
import { useTasksContext } from "../hooks/useTaskContext";

const MainLayout = () => {
  const { tasks } = useTasksContext();

  return (
    <Container
      maxWidth="xl"
      className="flex flex-col justify-between gap-3 h-screen overflow-hidden"
    >
      <Box className="flex flex-col gap-3 mt-3 overflow-hidden">
        <ChartContainer tasks={tasks} />
        <EnhancedTable />
      </Box>

      <Footer />
    </Container>
  );
};

export default MainLayout;
