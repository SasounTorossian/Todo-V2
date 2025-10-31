import type { PickerValue } from "@mui/x-date-pickers/internals";
import type { ChangeEvent } from "react";
import { useState } from "react";
import type { SubTask, Task } from "../types/task";
import { PRIORITIES, STATUSES } from "../types/task";

interface useModalProps {
  createBaseTask?: () => Task;
  createBaseSubTask?: () => SubTask;
}

const useModal = ({ createBaseTask, createBaseSubTask }: useModalProps) => {
  const [baseTask, setBaseTask] = useState<Task>(
    createBaseTask?.() ?? ({} as Task),
  );

  const [baseSubTask, setBaseSubTask] = useState<SubTask>(
    createBaseSubTask?.() ?? ({} as SubTask),
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | PickerValue,
    fieldName?: string,
  ) => {
    if (fieldName == "due_date") {
      const newDueDate = e as PickerValue;
      setBaseTask({
        ...baseTask,
        ["due_date"]: newDueDate?.utc(true).toDate(),
      });
      return;
    }

    const { name, value } = (
      e as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ).target;
    if (name == "priority") {
      setBaseTask({
        ...baseTask,
        [name]:
          PRIORITIES.find((priority) => priority.value == value) ||
          PRIORITIES[0],
      });
    } else if (name == "status") {
      setBaseTask({
        ...baseTask,
        [name]: STATUSES.find((status) => status.value == value) || STATUSES[0],
      });
    } else {
      setBaseTask({ ...baseTask, [name]: value });
    }
  };

  const handleChangeNewSubTask = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBaseSubTask({ ...baseSubTask, [name]: value });
  };

  const handleChangeExistingSubTask = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    subTaskID: string,
  ) => {
    const { value } = e.target;
    setBaseTask({
      ...baseTask,
      sub_tasks:
        baseTask.sub_tasks?.map((st) =>
          st.id == subTaskID ? { ...st, title: value } : st,
        ) || [],
    });
  };

  const handleDeleteExistingSubTask = (subTaskID: string) => {
    setBaseTask({
      ...baseTask,
      sub_tasks: baseTask.sub_tasks?.filter((st) => st.id != subTaskID) || [],
    });
  };

  const handleAddNewSubTask = () => {
    if (!baseSubTask || !baseSubTask.title) {
      return;
    }

    setBaseTask({
      ...baseTask,
      sub_tasks: [...(baseTask.sub_tasks || []), baseSubTask],
    });
    setBaseSubTask(createBaseSubTask?.() ?? ({} as SubTask));
  };

  return {
    baseTask,
    setBaseTask,
    baseSubTask,
    setBaseSubTask,
    handleChange,
    handleAddNewSubTask,
    handleChangeNewSubTask,
    handleChangeExistingSubTask,
    handleDeleteExistingSubTask,
  };
};

export default useModal;
