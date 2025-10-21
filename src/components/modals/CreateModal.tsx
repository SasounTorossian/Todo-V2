import { Add, Delete } from "@mui/icons-material";
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
import React, { useState } from "react";
import { useTasksContext } from "../../contexts/tasksContext";
import type { SubTask, Task } from "../../types/task";
import { PRIORITIES, STATUSES } from "../../types/task";

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
}

// TODO: Logic needs to be move somewhere else! -> userForm() ?
// TODO: Grey out button but allow clicking to highlight essential forms
const CreateModal = ({ open, onClose }: CreateModalProps) => {
  const { addTask, createBaseTask, createBaseSubTask } = useTasksContext();
  const [task, setTask] = useState<Task>(createBaseTask());
  const [subTask, setSubTask] = useState<SubTask>(createBaseSubTask());
  const [submitted, setSubmitted] = useState(false);

  const buttonStyle = {
    maxHeight: "36px",
    minWidth: "auto",
    padding: "6px",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | PickerValue,
    fieldName?: string,
  ) => {
    console.log(task);
    if (fieldName == "due_date") {
      const newDueDate = e as PickerValue;
      console.log(newDueDate);
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

  // TODO: Add toast for failure or success
  const handleAddTask = () => {
    setSubmitted(true);
    if (
      !task.title ||
      Object.keys(task.status).length == 0 ||
      Object.keys(task.priority).length == 0
    ) {
      return;
    }

    addTask(task);
    setTask(createBaseTask());
    setSubmitted(false);
    onClose();
  };

  const handleAddSubTask = () => {
    if (!subTask || !subTask.title) {
      return;
    }

    setTask({ ...task, sub_tasks: [...(task.sub_tasks || []), subTask] });
    setSubTask(createBaseSubTask());
  };

  const handleClose = () => {
    setTask(createBaseTask());
    setSubmitted(false);
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
            <Typography variant="h4">Create New Task</Typography>

            <IconButton onClick={() => handleClose()}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>

          <Box className="m-2">
            <TextField
              required
              variant="standard"
              className="w-full"
              label="Title"
              name="title"
              value={task.title}
              onChange={(e) => handleChange(e)}
              error={submitted && !task.title}
              helperText={submitted && !task.title && "Title field is required"}
            />
          </Box>

          <Box className="m-2">
            <TextField
              variant="standard"
              multiline
              rows={3}
              className="w-full"
              label="Notes (Optional)"
              name="notes"
              value={task.notes}
              onChange={(e) => handleChange(e)}
            />
          </Box>

          <Box className="m-2">
            <TextField
              required
              variant="standard"
              select
              className="w-full"
              label="Status"
              name="status"
              defaultValue={""}
              onChange={(e) => handleChange(e)}
              error={submitted && Object.keys(task.status).length == 0}
              helperText={
                submitted &&
                Object.keys(task.status).length == 0 &&
                "Status field is required"
              }
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
              required
              variant="standard"
              select
              className="w-full"
              label="Priority"
              name="priority"
              defaultValue={""}
              onChange={(e) => handleChange(e)}
              error={submitted && Object.keys(task.priority).length == 0}
              helperText={
                submitted &&
                Object.keys(task.priority).length == 0 &&
                "Priority field is required"
              }
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

          {task.sub_tasks &&
            task.sub_tasks.map((subTask, index) => (
              <Box key={subTask.id} className=" m-2 flex items-end gap-5">
                <TextField
                  className="grow"
                  variant="standard"
                  label={"Sub Task - " + (index + 1)}
                  value={subTask.title}
                  name="title"
                  onChange={(e) => handleChangeExistingSubTask(e, subTask.id)}
                />

                <Button
                  variant="contained"
                  color="error"
                  sx={buttonStyle}
                  onClick={() => handleDeleteExistingSubTask(subTask.id)}
                >
                  <Delete />
                </Button>
              </Box>
            ))}

          <Box className="m-2 flex flex-col">
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
                className=""
                variant="contained"
                onClick={() => handleAddSubTask()}
                sx={buttonStyle}
              >
                <Add />
              </Button>
            </Box>
          </Box>

          <Box className="m-2 mt-1">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Due Date (Optional)"
                  onChange={(e) => handleChange(e, "due_date")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box className="m-2 my-3 flex">
            <Button
              className="grow"
              variant="contained"
              onClick={() => handleAddTask()}
              endIcon={<Add />}
            >
              <Typography>Add Task</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default CreateModal;
