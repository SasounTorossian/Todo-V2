import { Delete } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box, FormControlLabel, Switch } from "@mui/material";
import Button from "@mui/material/Button";
import type { Dispatch, SetStateAction } from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
import type { Task } from "../../types/task";

interface EnhancedToolbarProps {
  selected: Task[];
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  setOpenUpdateModal: Dispatch<SetStateAction<boolean>>;
}

const EnhancedToolbar = ({
  selected,
  setOpenCreateModal,
  setOpenDeleteModal,
  setOpenUpdateModal,
}: EnhancedToolbarProps) => {
  const { mode, switchMode } = useThemeContext();

  return (
    <>
      <Box className="flex justify-between gap-5 my-5">
        <Box>
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
              Update {selected.length} Task{selected.length > 1 ? "s" : ""}
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
              Delete {selected.length} Task{selected.length > 1 ? "s" : ""}
            </Button>
          )}

          <Button
            className="w-45"
            variant="outlined"
            color="primary"
            endIcon={<Add />}
            onClick={() => setOpenCreateModal(true)}
          >
            Add New Task
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EnhancedToolbar;
