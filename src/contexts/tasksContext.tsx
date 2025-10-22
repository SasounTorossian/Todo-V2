import { useEffect, type ReactNode } from "react";
import { TasksContext } from "../hooks/useTaskContext";
import useTasks from "../hooks/useTasks";

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const taskHook = useTasks();

  // FIXME: Only for testing
  useEffect(() => {
    taskHook.setDefaultTasks();
  }, []);

  return (
    <TasksContext.Provider value={taskHook}>{children}</TasksContext.Provider>
  );
};
