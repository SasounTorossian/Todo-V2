import * as React from "react";
import ChartContainer from "../components/charts/ChartContainer";
import EnhancedTable from "../components/table/EnhancedTable";
import { useTasksContext } from "../hooks/useTaskContext";

const MainLayout = () => {
  const { tasks } = useTasksContext();

  return (
    <React.Fragment>
      <ChartContainer tasks={tasks} />
      <EnhancedTable />
    </React.Fragment>
  );
};

export default MainLayout;
