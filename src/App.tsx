import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TasksProvider } from './contexts/tasksContext';
import MainLayout from './layouts/MainLayout';
import './utils/dayjs';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f0f1f3',
      paper: '#fafafa',
    },
    primary: {
      main: '#3b82f6',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TasksProvider>
        <MainLayout />
      </TasksProvider>
    </ThemeProvider>
  )
}

export default App
