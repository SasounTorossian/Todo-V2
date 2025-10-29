import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";
import type { SubTask, Task, UpdateTask } from "../types/task";

interface TaskContextInterface {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  createBaseTask: () => Task;
  createUpdateTask: () => UpdateTask;
  createBaseSubTask: () => SubTask;
  setDefaultTasks: () => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: UpdateTask) => void;
  deleteTask: (id: string) => void;
  addSubTask: (taskID: string, subTask: SubTask) => void;
  deleteSubTask: (taskID: string, subTaskID: string) => void;
  updateSubTask: (
    taskID: string,
    subTaskID: string,
    updatedSubTask: SubTask,
  ) => void;
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
