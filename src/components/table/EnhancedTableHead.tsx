import { Checkbox, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

interface Header {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right";
}

const headers: readonly Header[] = [
  {
    id: "title",
    label: "Title",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "right",
    minWidth: 120,
  },
  {
    id: "priority",
    label: "Priority",
    align: "right",
    minWidth: 120,
  },
  {
    id: "created_at",
    label: "Created",
    align: "right",
  },
  {
    id: "due_date",
    label: "Due Date",
    align: "right",
  },
  {
    id: "options",
    label: "Options",
    align: "right",
  },
];

interface EnhancedTableHeadProps {
  numSelected: number;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

const EnhancedTableHead = ({
  handleSelectAll,
  numSelected,
  rowCount,
}: EnhancedTableHeadProps) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={handleSelectAll}
          />
        </TableCell>

        {headers.map((header) => (
          <TableCell
            key={header.id}
            align={header.align}
            style={{ minWidth: header.minWidth }}
          >
            <Typography variant="h6">{header.label}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default EnhancedTableHead;
