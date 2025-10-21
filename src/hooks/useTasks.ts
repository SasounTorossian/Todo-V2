import { useState } from 'react'
import type { Priority, Status, SubTask, Task, UpdateTask } from '../types/task'
import { PRIORITIES, STATUSES } from '../types/task'

const ONE_DAY = 60 * 60 * 24 * 1000

const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([])
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
        }
    }

    const createUpdateTask = (): UpdateTask => {
        return {
            notes: undefined,
            status: undefined,
            priority: undefined,
            due_date: undefined,
        }
    }

    const createBaseSubTask = (): SubTask => {
        return {
            id: crypto.randomUUID(),
            title: "",
        }
    }

    const createDefaultTasks = (): Task[] => {
        return [
            {
                id: crypto.randomUUID(),
                title: "Test Title 1",
                notes: "Note 1",
                status: STATUSES[0],
                priority: PRIORITIES[0],
                sub_tasks: [
                    {
                        id: crypto.randomUUID(),
                        title: "sub title 1",
                    },
                    {
                        id: crypto.randomUUID(),
                        title: "sub title 2",
                    },
                    {
                        id: crypto.randomUUID(),
                        title: "sub title 3",
                    },
                    {
                        id: crypto.randomUUID(),
                        title: "sub title 4",
                    },

                ],
                created_at: new Date(),
                due_date: new Date(now.getTime() + ONE_DAY),
            },
            {
                id: crypto.randomUUID(),
                title: "Test Title 2",
                notes: "This is a really really really really really really really long sub note for testing purposes 5",
                status: STATUSES[1],
                priority: PRIORITIES[1],
                sub_tasks: [
                    {
                        id: crypto.randomUUID(),
                        title: "sub title 5",
                    },
                    {
                        id: crypto.randomUUID(),
                        title: "sub title 6",
                    },
                ],
                created_at: new Date(),
                due_date: new Date(now.getTime() + 3 * ONE_DAY),
            },
            {
                id: crypto.randomUUID(),
                title: "Test Title 3",
                notes: "Note 3",
                status: STATUSES[0],
                priority: PRIORITIES[2],
                sub_tasks: [
                    {
                        id: crypto.randomUUID(),
                        title: "sub title 7",
                    },
                    {
                        id: crypto.randomUUID(),
                        title: "sub title 8",
                    },
                ],
                created_at: new Date(),
                due_date: new Date(now.getTime() + 7 * ONE_DAY),
            },
            {
                id: crypto.randomUUID(),
                title: "Test Title 4",
                notes: "Note 4",
                status: STATUSES[2],
                priority: PRIORITIES[3],
                sub_tasks: [
                    {
                        id: crypto.randomUUID(),
                        title: "sub title 9",
                    },
                    {
                        id: crypto.randomUUID(),
                        title: "sub title 10",
                    },
                ],
                created_at: new Date(),
                due_date: new Date(),
            },
            {
                id: crypto.randomUUID(),
                title: "Test Title 5",
                notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt sagittis mi, eu posuere leo pellentesque eget. Sed sagittis risus imperdiet, viverra metus sed, pharetra eros. Phasellus aliquam vitae purus vel bibendum. Aliquam vitae sapien justo. Integer nec risus tempus, sodales nisl ut, sodales felis. Mauris interdum, quam in egestas dictum, elit eros convallis mauris, accumsan accumsan tortor metus eu velit. Nam congue lorem orci, ac interdum augue finibus lacinia. Nullam volutpat vestibulum ante, ac finibus diam efficitur nec. Phasellus sit amet erat vitae tellus sodales pretium. Proin et orci eu nunc tempor mollis id eu elit. Cras porttitor ex eget enim placerat, consequat auctor nisi molestie. Proin id viverra nunc, luctus blandit risus. Morbi sed felis eget ligula aliquet convallis. Vestibulum bibendum sapien in tincidunt ultricies. ",
                status: STATUSES[0],
                priority: PRIORITIES[3],
                sub_tasks: [],
                created_at: new Date(),
                due_date: new Date(),
            }
        ]
    }

    const addTask = (task: Task) => {
        console.log("Adding Task", task)
        setTasks((tasks) => [...tasks, task])
    }

    const deleteTask = (id: string) => {
        console.log("Deleting Task", tasks.filter((task) => task.id == id))
        setTasks((tasks) => tasks.filter((task) => task.id != id))
    }

    const updateTask = (id: string, updatedTask: UpdateTask) => {
        console.log("Updating Task", tasks.filter((task) => task.id == id))
        setTasks((tasks) => tasks.map((task) => (task.id == id ?
            {
                ...task,
                notes: updatedTask.notes ?? task.notes,
                status: updatedTask.status ?? task.status,
                priority: updatedTask.priority ?? task.priority,
                sub_tasks: updatedTask.sub_tasks ?? task.sub_tasks,
                due_date: updatedTask.due_date ?? task.due_date,
            } : task)) || [])
    }

    const addSubTask = (taskID: string, subTask: SubTask) => {
        console.log("Adding Sub Task", subTask)
        setTasks(tasks.map((task) => (task.id == taskID ? { ...task, sub_tasks: [...(task.sub_tasks || []), subTask] } : task)))
    }

    const deleteSubTask = (taskID: string, subTaskID: string) => {
        console.log("Deleting Sub Task", subTaskID)
        setTasks(tasks.map((task) => task.id == taskID ? { ...task, sub_tasks: task.sub_tasks?.filter((subTask) => subTask.id != subTaskID) || [] } : task))
    }

    const updateSubTask = (taskID: string, subTaskID: string, updatedSubTask: SubTask) => {
        console.log("Updating Sub Task", updatedSubTask)
        setTasks(tasks.map((task) => task.id == taskID ? { ...task, sub_tasks: task.sub_tasks?.map((subTask) => subTask.id == subTaskID ? { ...subTask, ...updatedSubTask } : subTask) || [] } : task))
    }


    const setDefaultTasks = () => {
        setTasks(createDefaultTasks())
    }

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
        updateSubTask
    }
}

export default useTasks