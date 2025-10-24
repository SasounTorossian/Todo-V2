import { TasksProvider } from "./contexts/tasksContext";
import { CustomThemeProvider } from "./contexts/themeContext";
import MainLayout from "./layouts/MainLayout";
import "./utils/dayjs";

// NICE: Datetime Format Drowpdown - create content that the modals and rows take from to dynamically adjust datepicker format (Maybe combine with custom hook)
// NICE: Unit Tests
// NICE: Add Sorting To Table
// TODO: Storage
// TODO: Styling: Use Paper/rounded-gray-boxes for containg graphs and table

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
