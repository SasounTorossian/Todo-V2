import { PRIORITIES, STATUSES } from "../types/task";
const ONE_DAY = 60 * 60 * 24 * 1000;
const now = new Date();

export const testTasks = [
  {
    id: crypto.randomUUID(),
    title: "Water houseplants",
    notes: "Except for the succulents",
    status: STATUSES[0],
    priority: PRIORITIES[0],
    sub_tasks: [
      {
        id: crypto.randomUUID(),
        title: "sub title 1",
      },
    ],
    created_at: new Date(),
    due_date: new Date(now.getTime() + ONE_DAY),
  },
  {
    id: crypto.randomUUID(),
    title: "Get jean pockets stitched",
    notes: "",
    status: STATUSES[0],
    priority: PRIORITIES[1],
    sub_tasks: [
      {
        id: crypto.randomUUID(),
        title: "Ask if they also repair jackets",
      },
    ],
    created_at: new Date(),
    due_date: undefined,
  },
  {
    id: crypto.randomUUID(),
    title: "Buy fathers day gift",
    notes: "Don't just buy alcohol",
    status: STATUSES[0],
    priority: PRIORITIES[2],
    created_at: new Date(),
    due_date: new Date(now.getTime() + 32 * ONE_DAY),
  },
  {
    id: crypto.randomUUID(),
    title: "Fix car turbocharger",
    status: STATUSES[2],
    priority: PRIORITIES[3],
    sub_tasks: [
      {
        id: crypto.randomUUID(),
        title: "Need to look online for a new one",
      },
      {
        id: crypto.randomUUID(),
        title: "Need to find a mechanic that's willing to install it",
      },
    ],
    created_at: new Date(),
    due_date: new Date(now.getTime() + 31 * ONE_DAY),
  },
];
