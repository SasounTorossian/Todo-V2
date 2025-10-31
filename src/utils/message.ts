import type { Task } from "../types/task";

export const snackbarSuccess = (type: string, items: Task[]) => {
  return items.length > 1
    ? `Succesfully ${type} ${items.length} Tasks`
    : `Succesfully ${type} Task`;
};
