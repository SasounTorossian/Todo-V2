import { Add, Delete, Edit } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect } from "react";
import useModal from "../../hooks/useModal";
import { useTasksContext } from "../../hooks/useTaskContext";
import type { Task } from "../../types/task";
import { PRIORITIES, STATUSES } from "../../types/task";
import dayjs from "../../utils/dayjs";
import Dropdown from "../fields/Dropdown";
import EnhancedModal from "./EnhancedModal";

interface UpdateModalProps {
  open: boolean;
  selected: Task[];
  onUpdate: () => void;
  onClose: () => void;
}

const UpdateModal = ({
  open,
  selected,
  onUpdate,
  onClose,
}: UpdateModalProps) => {
  const { updateTask, createBaseTask, createBaseSubTask } = useTasksContext();
  const {
    baseTask,
    setBaseTask,
    baseSubTask,
    handleChange,
    handleAddNewSubTask,
    handleChangeNewSubTask,
    handleChangeExistingSubTask,
    handleDeleteExistingSubTask,
  } = useModal({ createBaseTask, createBaseSubTask });

  useEffect(() => {
    if (!open) return;
    return selected.length == 1
      ? setBaseTask(selected[0])
      : setBaseTask(createBaseTask());
  }, [open, selected]);

  const buttonStyle = {
    maxHeight: "36px",
    minWidth: "auto",
    padding: "6px",
  };

  const handleUpdateTasks = () => {
    selected.forEach((currentTask) => updateTask(currentTask.id, baseTask));
    setBaseTask(createBaseTask());
    onUpdate();
    onClose();
  };

  const handleClose = () => {
    setBaseTask(createBaseTask());
    onClose();
  };

  return (
    <EnhancedModal open={open} onClose={onClose}>
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
          value={baseTask.notes}
          onChange={(e) => handleChange(e)}
        />
      </Box>

      <Box className="m-2">
        <Dropdown
          label={"Status"}
          name={"status"}
          options={STATUSES}
          defaultValue={selected.length == 1 ? baseTask.status?.value : ""}
          value={baseTask.status?.value ?? ""}
          onChange={(e) => handleChange(e)}
        />
      </Box>

      <Box className="m-2">
        <Dropdown
          label={"Priority"}
          name={"priority"}
          options={PRIORITIES}
          defaultValue={selected.length == 1 ? baseTask.priority?.value : ""}
          value={baseTask.priority?.value ?? ""}
          onChange={(e) => handleChange(e)}
        />
      </Box>

      {selected.length == 1 && (
        <Box className="m-2 flex flex-col">
          {baseTask.sub_tasks &&
            baseTask.sub_tasks.map((subTask, index) => (
              <Box key={subTask.id} className="flex items-end gap-5 mb-2">
                <TextField
                  className="grow"
                  variant="standard"
                  label={"Sub Task - " + (index + 1)}
                  name="title"
                  value={subTask.title}
                  onChange={(e) => handleChangeExistingSubTask(e, subTask.id)}
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
              value={baseSubTask.title}
              onChange={(e) => handleChangeNewSubTask(e)}
            />

            <Button
              disabled={!baseSubTask.title}
              variant="contained"
              color="primary"
              sx={buttonStyle}
              onClick={() => handleAddNewSubTask()}
            >
              <Add fontSize="medium" />
            </Button>
          </Box>
        </Box>
      )}

      <Box className="m-2">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              className="grow"
              value={baseTask.due_date ? dayjs(baseTask.due_date) : null}
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
          <Typography>Update Task{selected.length > 1 ? "s" : ""}</Typography>
        </Button>
      </Box>
    </EnhancedModal>
  );
};

export default UpdateModal;
