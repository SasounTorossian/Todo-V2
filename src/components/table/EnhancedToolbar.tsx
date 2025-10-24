import { Delete } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Container, FormControlLabel, Switch } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
import type { Task } from "../../types/task";

interface EnhancedToolbarProps {
  selected: Task[];
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnhancedToolbar = ({
  selected,
  setOpenCreateModal,
  setOpenDeleteModal,
  setOpenUpdateModal,
}: EnhancedToolbarProps) => {
  const { mode, switchMode } = useThemeContext();

  return (
    <React.Fragment>
      <Container className="flex justify-between gap-5 mt-5">
        <Box className="mt-1">
          <FormControlLabel
            control={
              <Switch
                checked={mode == "dark"}
                onChange={switchMode}
                slotProps={{ input: { "aria-label": "controlled" } }}
              />
            }
            label="Dark Mode"
            labelPlacement="start"
          />
        </Box>
        <Box className="flex justify-end gap-5">
          {selected.length > 0 && (
            <Button
              className="w-45"
              variant="outlined"
              color="warning"
              endIcon={<EditIcon />}
              onClick={() => setOpenUpdateModal(true)}
            >
              <Box className="mt-1">
                Update {selected.length} Task{selected.length > 1 ? "s" : ""}
              </Box>
            </Button>
          )}

          {selected.length > 0 && (
            <Button
              className="w-45"
              variant="outlined"
              color="error"
              endIcon={<Delete />}
              onClick={() => setOpenDeleteModal(true)}
            >
              <Box className="mt-1">
                Delete {selected.length} Task{selected.length > 1 ? "s" : ""}
              </Box>
            </Button>
          )}

          <Button
            className="w-45"
            variant="outlined"
            color="primary"
            endIcon={<Add />}
            onClick={() => setOpenCreateModal(true)}
          >
            <Box className="mt-1">Add New Task</Box>
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default EnhancedToolbar;
