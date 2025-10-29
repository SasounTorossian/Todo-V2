import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

interface EnhancedRowButtonsProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onUpdate: () => void;
  onDelete: () => void;
}

const EnhancedRowButtons = ({
  open,
  setOpen,
  onUpdate,
  onDelete,
}: EnhancedRowButtonsProps) => {
  return (
    <>
      <IconButton
        color="primary"
        aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
      <IconButton
        color="warning"
        aria-label="edit row"
        size="small"
        onClick={() => onUpdate()}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        color="error"
        aria-label="delete row"
        size="small"
        onClick={() => onDelete()}
      >
        <Delete fontSize="small" />
      </IconButton>
    </>
  );
};

export default EnhancedRowButtons;
