import { TasksProvider } from "./contexts/tasksContext";
import { CustomThemeProvider } from "./contexts/themeContext";
import MainLayout from "./layouts/MainLayout";
import "./utils/dayjs";

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
