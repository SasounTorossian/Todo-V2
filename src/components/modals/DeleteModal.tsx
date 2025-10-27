import { Delete } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, List, ListItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React from "react";
import { useTasksContext } from "../../hooks/useTaskContext";
import type { Task } from "../../types/task";

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
              Delete Task{selected.length > 1 ? "s" : ""}
            </Typography>

            <IconButton onClick={() => handleClose()}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>

          <Box className="ms-1">
            <Typography variant="body1">
              Are you sure you want to delete the following {selected.length}{" "}
              task
              {selected.length > 1 ? "s" : ""}:
            </Typography>
            <List sx={{ listStyleType: "disc", listStylePosition: "inside" }}>
              {selected.map((task) => (
                <ListItem sx={{ display: "list-item" }} key={task.id}>
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
              <Typography>
                Delete Task{selected.length > 1 ? "s" : ""}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteModal;
