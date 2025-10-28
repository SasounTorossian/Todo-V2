import { PRIORITIES, STATUSES } from "../types/task";
const ONE_DAY = 60 * 60 * 24 * 1000;
const now = new Date();

export const testTasks = [
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
    notes:
      "This is a really really really really really really really long sub note for testing purposes 5",
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
    due_date: undefined,
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
    due_date: undefined,
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
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt sagittis mi, eu posuere leo pellentesque eget. Sed sagittis risus imperdiet, viverra metus sed, pharetra eros. Phasellus aliquam vitae purus vel bibendum. ",
    status: STATUSES[0],
    priority: PRIORITIES[3],
    sub_tasks: [],
    created_at: new Date(),
    due_date: new Date(),
  },
  {
    id: crypto.randomUUID(),
    title: "Test Title 6",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt sagittis mi, eu posuere leo pellentesque eget. Sed sagittis risus imperdiet, viverra metus sed, pharetra eros. Phasellus aliquam vitae purus vel bibendum. Aliquam vitae sapien justo. Integer nec risus tempus, sodales nisl ut, sodales felis. Mauris interdum, quam in egestas dictum, elit eros convallis mauris, accumsan accumsan tortor metus eu velit. Nam congue lorem orci, ac interdum augue finibus lacinia. Nullam volutpat vestibulum ante, ac finibus diam efficitur nec. Phasellus sit amet erat vitae tellus sodales pretium. Proin et orci eu nunc tempor mollis id eu elit. Cras porttitor ex eget enim placerat, consequat auctor nisi molestie. Proin id viverra nunc, luctus blandit risus. Morbi sed felis eget ligula aliquet convallis. Vestibulum bibendum sapien in tincidunt ultricies. ",
    status: STATUSES[1],
    priority: PRIORITIES[1],
    sub_tasks: [],
    created_at: new Date(),
    due_date: new Date(now.getTime() + 30 * ONE_DAY),
  },
  {
    id: crypto.randomUUID(),
    title: "Test Title 7",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt sagittis mi, eu posuere leo pellentesque eget. Sed sagittis risus imperdiet, viverra metus sed, pharetra eros. Phasellus aliquam vitae purus vel bibendum. ",
    status: STATUSES[0],
    priority: PRIORITIES[0],
    sub_tasks: [],
    created_at: new Date(),
    due_date: new Date(now.getTime() + 34 * ONE_DAY),
  },
  {
    id: crypto.randomUUID(),
    title: "Test Title 8",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt sagittis mi, eu posuere leo pellentesque eget. Sed sagittis risus imperdiet, viverra metus sed, pharetra eros. Phasellus aliquam vitae purus vel bibendum. ",
    status: STATUSES[1],
    priority: PRIORITIES[1],
    sub_tasks: [],
    created_at: new Date(),
    due_date: new Date(now.getTime() + 30 * ONE_DAY),
  },
  {
    id: crypto.randomUUID(),
    title: "Test Title 9",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt sagittis mi, eu posuere leo pellentesque eget. Sed sagittis risus imperdiet, viverra metus sed, pharetra eros. Phasellus aliquam vitae purus vel bibendum. ",
    status: STATUSES[0],
    priority: PRIORITIES[3],
    sub_tasks: [],
    created_at: new Date(),
    due_date: new Date(now.getTime() + 46 * ONE_DAY),
  },
  {
    id: crypto.randomUUID(),
    title: "Test Title 10",
    status: STATUSES[2],
    priority: PRIORITIES[3],
    sub_tasks: [],
    created_at: new Date(),
    due_date: new Date(now.getTime() + 100 * ONE_DAY),
  },
];
