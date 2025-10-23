import { COLOURS } from "../constants/colours";

export type Task = {
  id: string;
  title: string;
  notes?: string;
  status: Status;
  priority: Priority;
  sub_tasks?: SubTask[];
  created_at: Date;
  due_date?: Date;
};

export type SubTask = {
  id: string;
  title: string;
};

export type UpdateTask = {
  notes?: string;
  status?: Status;
  sub_tasks?: SubTask[];
  priority?: Priority;
  due_date?: Date;
};

export type Status = {
  label: string;
  value: string;
  colour: string;
};

export type Priority = {
  label: string;
  value: string;
  colour: string;
};

export const STATUSES: Status[] = [
  {
    label: "Open",
    value: "open",
    colour: COLOURS.green,
  },
  {
    label: "Closed",
    value: "closed",
    colour: COLOURS.blue,
  },
  {
    label: "Blocked",
    value: "blocked",
    colour: COLOURS.purple,
  },
];

export const PRIORITIES: Priority[] = [
  {
    label: "Low",
    value: "low",
    colour: COLOURS.green,
  },
  {
    label: "Medium",
    value: "medium",
    colour: COLOURS.yellow,
  },
  {
    label: "High",
    value: "high",
    colour: COLOURS.orange,
  },
  {
    label: "Critical",
    value: "critical",
    colour: COLOURS.red,
  },
];
