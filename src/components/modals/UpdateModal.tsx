import { Add, Delete, Edit } from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useTasksContext } from "../../hooks/useTaskContext";
import type { SubTask, Task, UpdateTask } from "../../types/task";
import { PRIORITIES, STATUSES } from "../../types/task";
import dayjs from "../../utils/dayjs";

interface UpdateModalProps {
  open: boolean;
  selected: Task[];
  onUpdate: () => void;
  onClose: () => void;
}

// TODO: Logic needs to be move somewhere else! -> userForm() ?
const UpdateModal = ({
  open,
  selected,
  onUpdate,
  onClose,
}: UpdateModalProps) => {
  const { updateTask, createUpdateTask, createBaseSubTask } = useTasksContext();
  const [task, setTask] = useState<UpdateTask>(createUpdateTask());
  const [subTask, setSubTask] = useState<SubTask>(createBaseSubTask());

  useEffect(() => {
    if (selected.length == 1) {
      const updateTask: UpdateTask = {
        notes: selected[0].notes,
        status: selected[0].status,
        priority: selected[0].priority,
        sub_tasks: selected[0].sub_tasks,
        due_date: selected[0].due_date,
      };

      setTask(updateTask);
    } else {
      setTask(createUpdateTask());
    }
  }, [selected]);

  const buttonStyle = {
    maxHeight: "36px",
    minWidth: "auto",
    padding: "6px",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | PickerValue,
    fieldName?: string,
  ) => {
    if (fieldName == "due_date") {
      const newDueDate = e as PickerValue;
      setTask({ ...task, ["due_date"]: newDueDate?.utc(true).toDate() });
      return;
    }

    const { name, value } = (
      e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ).target;
    if (name == "priority") {
      setTask({
        ...task,
        [name]:
          PRIORITIES.find((priority) => priority.value == value) ||
          PRIORITIES[0],
      });
    } else if (name == "status") {
      setTask({
        ...task,
        [name]: STATUSES.find((status) => status.value == value) || STATUSES[0],
      });
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  const handleUpdateTasks = () => {
    console.log(task);
    selected.forEach((currentTask) => updateTask(currentTask.id, task));
    onUpdate();
    onClose();
  };

  const handleChangeSubTask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setSubTask({ ...subTask, [name]: value });
  };

  const handleChangeExistingSubTask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    subTaskID: string,
  ) => {
    const { value } = e.target;
    setTask({
      ...task,
      sub_tasks:
        task.sub_tasks?.map((st) =>
          st.id == subTaskID ? { ...st, title: value } : st,
        ) || [],
    });
  };

  const handleDeleteExistingSubTask = (subTaskID: string) => {
    setTask({
      ...task,
      sub_tasks: task.sub_tasks?.filter((st) => st.id != subTaskID) || [],
    });
  };

  const handleAddSubTask = () => {
    if (!subTask || !subTask.title) {
      return;
    }

    setTask({ ...task, sub_tasks: [...(task.sub_tasks || []), subTask] });
    setSubTask(createBaseSubTask());
  };

  const handleClose = () => {
    setTask(createUpdateTask());
    onClose();
  };

  // TODO: Add form validation
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ bgcolor: "background.paper" }}
          className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] border-1 border-white -2xl p-4"
        >
          <Box className="ms-1 flex justify-between items-center">
            <Typography variant="h4">
              Update Task{selected.length > 1 ? "s" : ""}
            </Typography>

            <IconButton onClick={() => handleClose()}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>

          <Box className="m-2">
            <TextField
              variant="standard"
              multiline
              rows={3}
              className="w-full"
              label="Notes"
              name="notes"
              value={task.notes}
              onChange={(e) => handleChange(e)}
            />
          </Box>

          <Box className="m-2">
            <TextField
              variant="standard"
              select
              className="w-full"
              label="Status"
              name="status"
              value={selected.length == 1 ? task.status?.value : ""}
              onChange={(e) => handleChange(e)}
            >
              {STATUSES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box className="flex">
                    <Box className="ms-2">
                      <CircleIcon
                        className="mb-1"
                        fontSize="small"
                        style={{ color: option.colour }}
                      />
                    </Box>
                    <Box className="ms-2">{option.label}</Box>
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box className="m-2">
            <TextField
              variant="standard"
              select
              className="w-full"
              label="Priority"
              name="priority"
              value={selected.length == 1 ? task.priority?.value : ""}
              onChange={(e) => handleChange(e)}
            >
              {PRIORITIES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box className="flex">
                    <Box className="ms-2">
                      <CircleIcon
                        className="mb-1"
                        fontSize="small"
                        style={{ color: option.colour }}
                      />
                    </Box>
                    <Box className="ms-2">{option.label}</Box>
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {selected.length == 1 && (
            <Box className="m-2 flex flex-col">
              {task.sub_tasks &&
                task.sub_tasks.map((subTask, index) => (
                  <Box key={subTask.id} className="flex items-end gap-5 mb-2">
                    <TextField
                      className="grow"
                      variant="standard"
                      label={"Sub Task - " + (index + 1)}
                      name="title"
                      value={subTask.title}
                      onChange={(e) =>
                        handleChangeExistingSubTask(e, subTask.id)
                      }
                    />

                    <Button
                      className=""
                      variant="contained"
                      color="error"
                      sx={buttonStyle}
                      onClick={() => handleDeleteExistingSubTask(subTask.id)}
                    >
                      <Delete />
                    </Button>
                  </Box>
                ))}

              <Box className="flex items-end gap-5">
                <TextField
                  className="grow"
                  variant="standard"
                  label="New Sub Task (Optional)"
                  name="title"
                  value={subTask.title}
                  onChange={(e) => handleChangeSubTask(e)}
                />

                <Button
                  variant="contained"
                  color="primary"
                  sx={buttonStyle}
                  onClick={() => handleAddSubTask()}
                >
                  <Add fontSize="medium" />
                </Button>
              </Box>
            </Box>
          )}

          <Box className="m-2">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  value={task.due_date ? dayjs(task.due_date) : null}
                  label="Due Date"
                  onChange={(e) => handleChange(e, "due_date")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box className="m-2 my-3 flex">
            <Button
              className="grow"
              variant="contained"
              color="warning"
              onClick={() => handleUpdateTasks()}
              endIcon={<Edit />}
            >
              <Typography>
                Update Task{selected.length > 1 ? "s" : ""}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default UpdateModal;
