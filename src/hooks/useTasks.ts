import { useState } from "react";
import { testTasks } from "../constants/testTasks";
import type {
  Priority,
  Status,
  SubTask,
  Task,
  UpdateTask,
} from "../types/task";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const now = new Date();

  const createBaseTask = (): Task => {
    return {
      id: crypto.randomUUID(),
      title: "",
      notes: "",
      status: {} as Status,
      priority: {} as Priority,
      sub_tasks: [],
      created_at: now,
      due_date: undefined,
    };
  };

  const createUpdateTask = (): UpdateTask => {
    return {
      notes: undefined,
      status: undefined,
      priority: undefined,
      due_date: undefined,
    };
  };

  const createBaseSubTask = (): SubTask => {
    return {
      id: crypto.randomUUID(),
      title: "",
    };
  };

  const createDefaultTasks = (): Task[] => {
    return testTasks;
  };

  const addTask = (task: Task) => {
    console.log("Adding Task", task);
    setTasks((tasks) => [...tasks, task]);
  };

  const deleteTask = (id: string) => {
    console.log(
      "Deleting Task",
      tasks.filter((task) => task.id == id),
    );
    setTasks((tasks) => tasks.filter((task) => task.id != id));
  };

  const updateTask = (id: string, updatedTask: UpdateTask) => {
    console.log(
      "Updating Task",
      tasks.filter((task) => task.id == id),
    );
    setTasks(
      (tasks) =>
        tasks.map((task) =>
          task.id == id
            ? {
                ...task,
                notes: updatedTask.notes ?? task.notes,
                status: updatedTask.status ?? task.status,
                priority: updatedTask.priority ?? task.priority,
                sub_tasks: updatedTask.sub_tasks ?? task.sub_tasks,
                due_date: updatedTask.due_date ?? task.due_date,
              }
            : task,
        ) || [],
    );
  };

  const addSubTask = (taskID: string, subTask: SubTask) => {
    console.log("Adding Sub Task", subTask);
    setTasks(
      tasks.map((task) =>
        task.id == taskID
          ? { ...task, sub_tasks: [...(task.sub_tasks || []), subTask] }
          : task,
      ),
    );
  };

  const deleteSubTask = (taskID: string, subTaskID: string) => {
    console.log("Deleting Sub Task", subTaskID);
    setTasks(
      tasks.map((task) =>
        task.id == taskID
          ? {
              ...task,
              sub_tasks:
                task.sub_tasks?.filter((subTask) => subTask.id != subTaskID) ||
                [],
            }
          : task,
      ),
    );
  };

  const updateSubTask = (
    taskID: string,
    subTaskID: string,
    updatedSubTask: SubTask,
  ) => {
    console.log("Updating Sub Task", updatedSubTask);
    setTasks(
      tasks.map((task) =>
        task.id == taskID
          ? {
              ...task,
              sub_tasks:
                task.sub_tasks?.map((subTask) =>
                  subTask.id == subTaskID
                    ? { ...subTask, ...updatedSubTask }
                    : subTask,
                ) || [],
            }
          : task,
      ),
    );
  };

  const setDefaultTasks = () => {
    setTasks(createDefaultTasks());
  };

  return {
    tasks,
    setTasks,
    createBaseTask,
    createUpdateTask,
    createBaseSubTask,
    setDefaultTasks,
    addTask,
    updateTask,
    deleteTask,
    addSubTask,
    deleteSubTask,
    updateSubTask,
  };
};

export default useTasks;
