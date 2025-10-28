import type { Task } from "../types/task";

export const successMessage = (type: string, items: Task[]) => {
  return items.length > 1
    ? `Succesfully ${type} ${items.length} Tasks`
    : `Succesfully ${type} Task`;
};
