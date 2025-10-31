import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";
import type { SubTask, Task } from "../types/task";

interface TaskContextInterface {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  createBaseTask: () => Task;
  createBaseSubTask: () => SubTask;
  setDefaultTasks: () => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Task) => void;
  deleteTask: (id: string) => void;
}

export const TasksContext = createContext<TaskContextInterface | undefined>(
  undefined,
);

export const useTasksContext = (): TaskContextInterface => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }

  return context;
};
