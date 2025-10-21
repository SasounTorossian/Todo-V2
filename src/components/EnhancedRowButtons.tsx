import { Delete } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import React from "react";

import EditIcon from "@mui/icons-material/Edit";

interface EnhancedRowButtonsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default EnhancedRowButtons;
