import { useEffect, useState } from "react";
import { testTasks } from "../constants/testTasks";
import type { SubTask, Task } from "../types/task";
import useLocalStorage from "./useLocalStorage";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [localStorage, setLocalStorage] = useLocalStorage<Task[]>("tasks", []);
  const now = new Date();

  const createBaseTask = (): Task => {
    return {
      id: crypto.randomUUID(),
      title: "",
      notes: "",
      status: undefined,
      priority: undefined,
      sub_tasks: [],
      created_at: now,
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

  const updateTask = (id: string, updatedTask: Task) => {
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
                sub_tasks:
                  updatedTask.sub_tasks?.length == 0
                    ? task.sub_tasks
                    : updatedTask.sub_tasks,
                due_date: updatedTask.due_date ?? task.due_date,
              }
            : task,
        ) || [],
    );
  };

  const setDefaultTasks = () => {
    return localStorage.length == 0
      ? setTasks(createDefaultTasks())
      : setTasks(localStorage);
  };

  useEffect(() => {
    setLocalStorage(tasks);
  }, [tasks]);

  return {
    tasks,
    setTasks,
    createBaseTask,
    createBaseSubTask,
    setDefaultTasks,
    addTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
