import { TasksProvider } from "./contexts/tasksContext";
import { CustomThemeProvider } from "./contexts/themeContext";
import MainLayout from "./layouts/MainLayout";
import "./utils/dayjs";

// NICE: Datetime Format Drowpdown - create content that the modals and rows take from to dynamically adjust datepicker format (Maybe combine with custom hook)
// NICE: Unit Tests
// NICE: Add Sorting To Table
// TODO: Styling: Delete button list, etc.

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
