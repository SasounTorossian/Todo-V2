import { TasksProvider } from "./contexts/tasksContext";
import { CustomThemeProvider } from "./contexts/themeContext";
import MainLayout from "./layouts/MainLayout";
import "./utils/dayjs";

// TODO: Clean up fully
// * Modal hooks
// * Dropdown Component
// * Speed up?

const App = () => {
  return (
    <CustomThemeProvider>
      <TasksProvider>
        <MainLayout />
      </TasksProvider>
    </CustomThemeProvider>
  );
};

export default App;
