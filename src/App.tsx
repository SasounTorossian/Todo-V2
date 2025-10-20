import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TasksProvider } from './contexts/tasksContext';
import MainLayout from './layouts/MainLayout';
import './utils/dayjs';

// NICE: Datetime Format Drowpdown - create content that the modals and rows take from to dynamically adjust datepicker format (Maybe combine with custom hook)
// NICE: LKight/Dark Theme Mode Switch - Make as separate component that can be drag-and-dropped anywhere in the code base (Mainly toolbar). useContext() 
// NICE: Set Up Linter On Save - Read into it and figure it out.
// TODO: Set Up Lint On Git Commit - Been wanting to do this for a while now.
// NICE: Unit Tests

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
