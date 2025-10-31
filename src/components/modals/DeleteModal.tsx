import { Delete } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, List, ListItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTasksContext } from "../../hooks/useTaskContext";
import type { Task } from "../../types/task";
import EnhancedModal from "./EnhancedModal";

interface DeleteModalProps {
  open: boolean;
  selected: Task[];
  onDelete: () => void;
  onClose: () => void;
}

const DeleteModal = ({
  open,
  selected,
  onDelete,
  onClose,
}: DeleteModalProps) => {
  const { deleteTask } = useTasksContext();

  const handleDeleteTasks = () => {
    selected.forEach((task) => deleteTask(task.id));
    onDelete();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <EnhancedModal open={open} onClose={onClose}>
      <Box className="ms-1 flex justify-between items-center">
        <Typography variant="h4">
          Delete Task{selected.length > 1 ? "s" : ""}
        </Typography>

        <IconButton onClick={() => handleClose()}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box className="ms-1">
        <Typography variant="body1">
          Are you sure you want to delete the following {selected.length} task{" "}
          {selected.length > 1 ? "s" : ""}:
        </Typography>
        <List sx={{ listStyleType: "disc", listStylePosition: "inside" }}>
          {selected.map((task) => (
            <ListItem key={task.id} dense={true} sx={{ display: "list-item" }}>
              {task.title}
            </ListItem>
          ))}
        </List>
      </Box>

      <Box className="m-2 my-3 flex">
        <Button
          className="grow"
          variant="contained"
          color="error"
          onClick={() => handleDeleteTasks()}
          endIcon={<Delete />}
        >
          <Typography>Delete Task{selected.length > 1 ? "s" : ""}</Typography>
        </Button>
      </Box>
    </EnhancedModal>
  );
};

export default DeleteModal;
