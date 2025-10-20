export type Task = {
    id: string
    title: string
    notes?: string
    status: Status
    priority: Priority
    sub_tasks?: SubTask[]
    created_at: Date
    due_date?: Date
}

export type SubTask = {
    id: string
    title: string
    created_at: Date
}

export type UpdateTask = {
    notes?: string
    status?: Status
    priority?: Priority
    due_date?: Date
}

export type Status = {
    label: string
    value: string
    colour: string
}

export type Priority = {
    label: string
    value: string
    colour: string
}

export const STATUSES: Status[] = [
    {
        label: "Open",
        value: "open",
        colour: "#16f34a"
    },
    {
        label: "Closed",
        value: "closed",
        colour: "#3b82f6"
    },
    {
        label: "Blocked",
        value: "blocked",
        colour: "#a78bfa"
    }
]

export const PRIORITIES: Priority[] = [
    {
        label: "Low",
        value: "low",
        colour: "#16a34a"
    },
    {
        label: "Medium",
        value: "medium",
        colour: "#eab308"
    },
    {
        label: "High",
        value: "high",
        colour: "#d97706"
    },
    {
        label: "Critical",
        value: "critical",
        colour: "#dc2626"
    },
]