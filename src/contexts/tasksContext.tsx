import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { Task, SubTask, UpdateTask } from "../types/task";
import useTasks from "../hooks/useTasks";

interface TaskContextInterface {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    createBaseTask: () => Task;
    createUpdateTask: () => UpdateTask;
    setDefaultTasks: () => void;
    addTask: (task: Task) => void;
    updateTask: (id: string, updatedTask: UpdateTask) => void;
    deleteTask: (id: string) => void;
    addSubTask: (taskID: string, subTask: SubTask) => void;
    deleteSubTask: (taskID: string, subTaskID: string) => void;
    updateSubTask: (taskID: string, subTaskID: string, updatedSubTask: SubTask) => void;
}

const TasksContext = createContext<TaskContextInterface | undefined>(undefined)

export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const taskHook = useTasks()

    // NOTE: Only for testing
    useEffect(() => {
        taskHook.setDefaultTasks()
    }, [])

    return (
        <TasksContext.Provider value={taskHook}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasksContext = (): TaskContextInterface => {
    const context = useContext(TasksContext)
    if (!context) {
        throw new Error('useTasksContext must be used within a TasksProvider');
    }

    return context;
}