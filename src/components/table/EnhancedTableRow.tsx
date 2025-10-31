import CircleIcon from "@mui/icons-material/Circle";
import { Box, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type { Dispatch, MouseEvent, SetStateAction } from "react";
import { useState } from "react";
import type { Task } from "../../types/task";
import { formatTime } from "../../utils/time";
import EnhancedRowButtons from "./EnhancedRowButtons";
import EnhancedTableDropdown from "./EnhancedTableDropdown";

interface EnhancedTableRowProps {
  task: Task;
  selected: Task[];
  handleSelect: (event: MouseEvent<unknown>, task: Task) => void;
  setSelected: Dispatch<SetStateAction<Task[]>>;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  setOpenUpdateModal: Dispatch<SetStateAction<boolean>>;
}

const EnhancedTableRow = ({
  task,
  selected,
  handleSelect,
  setSelected,
  setOpenDeleteModal,
  setOpenUpdateModal,
}: EnhancedTableRowProps) => {
  const [open, setOpen] = useState(false);
  let isItemSelected = false;
  if (selected) {
    isItemSelected = selected.includes(task);
  }

  const handleDelete = () => {
    setSelected([task]);
    setOpenDeleteModal(true);
  };

  const handleUpdate = () => {
    setSelected([task]);
    setOpenUpdateModal(true);
  };

  return (
    <>
      <TableRow
        key={task.id}
        selected={isItemSelected}
        className="border-solid"
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            aria-checked={isItemSelected}
            checked={isItemSelected}
            onClick={(e) => handleSelect(e, task)}
          />
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          <Typography sx={{ fontWeight: "bold" }}>{task.title}</Typography>
        </TableCell>
        <TableCell align="right">
          <Box className="flex items-center justify-end">
            <CircleIcon
              className="me-2"
              fontSize="small"
              style={{ color: task.status?.colour }}
            />
            <Typography>{task.status?.label}</Typography>
          </Box>
        </TableCell>
        <TableCell align="right">
          <Box className="flex items-center justify-end">
            <CircleIcon
              className="me-2"
              fontSize="small"
              style={{ color: task.priority?.colour }}
            />
            <Typography>{task.priority?.label}</Typography>
          </Box>
        </TableCell>
        <TableCell align="right">
          <Typography>{formatTime(task.created_at)}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>
            {task.due_date ? formatTime(task.due_date) : "N/A"}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <EnhancedRowButtons
            open={open}
            setOpen={setOpen}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          ></EnhancedRowButtons>
        </TableCell>
      </TableRow>

      <EnhancedTableDropdown open={open} task={task} />
    </>
  );
};

export default EnhancedTableRow;
