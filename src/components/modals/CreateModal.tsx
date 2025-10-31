import { Add, Delete } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useModal from "../../hooks/useModal";
import { useTasksContext } from "../../hooks/useTaskContext";
import { PRIORITIES, STATUSES } from "../../types/task";
import Dropdown from "../fields/Dropdown";

interface CreateModalProps {
  open: boolean;
  onAdd: () => void;
  onClose: () => void;
}

const CreateModal = ({ open, onAdd, onClose }: CreateModalProps) => {
  const { addTask, createBaseTask, createBaseSubTask } = useTasksContext();
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

  const buttonStyle = {
    maxHeight: "36px",
    minWidth: "auto",
    padding: "6px",
  };

  const handleAddTask = () => {
    addTask(baseTask);
    setBaseTask(createBaseTask());
    onAdd();
    onClose();
  };

  const handleClose = () => {
    setBaseTask(createBaseTask());
    onClose();
  };

  return (
    <>
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
              value={baseTask.title}
              onChange={(e) => handleChange(e)}
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
              value={baseTask.notes}
              onChange={(e) => handleChange(e)}
            />
          </Box>

          <Box className="m-2">
            <Dropdown
              label={"Status"}
              name={"status"}
              required={true}
              options={STATUSES}
              defaultValue={""}
              onChange={(e) => handleChange(e)}
            />
          </Box>

          <Box className="m-2">
            <Dropdown
              label={"Priority"}
              name={"priority"}
              required={true}
              options={PRIORITIES}
              defaultValue={""}
              onChange={(e) => handleChange(e)}
            />
          </Box>

          {baseTask.sub_tasks &&
            baseTask.sub_tasks.map((baseSubTask, index) => (
              <Box key={baseSubTask.id} className=" m-2 flex items-end gap-5">
                <TextField
                  className="grow"
                  variant="standard"
                  label={"Sub Task - " + (index + 1)}
                  value={baseSubTask.title}
                  name="title"
                  onChange={(e) =>
                    handleChangeExistingSubTask(e, baseSubTask.id)
                  }
                />

                <Button
                  variant="contained"
                  color="error"
                  sx={buttonStyle}
                  onClick={() => handleDeleteExistingSubTask(baseSubTask.id)}
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
                value={baseSubTask.title}
                onChange={(e) => handleChangeNewSubTask(e)}
              />

              <Button
                disabled={!baseSubTask.title}
                className=""
                variant="contained"
                onClick={() => handleAddNewSubTask()}
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
                  className="grow"
                  label="Due Date (Optional)"
                  onChange={(e) => handleChange(e, "due_date")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box className="m-2 my-3 flex">
            <Button
              disabled={
                !baseTask.title ||
                !baseTask?.status?.value ||
                !baseTask.priority?.value
              }
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
    </>
  );
};

export default CreateModal;
