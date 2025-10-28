import { Box, Collapse, Table, TableBody, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
import type { Task } from "../../types/task";

interface EnhancedTableDropdownProps {
  open: boolean;
  task: Task;
}

const EnhancedTableDropdown = ({ open, task }: EnhancedTableDropdownProps) => {
  return (
    <React.Fragment>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="flex gap-5">
              <Box className="m-5 basis-2/3">
                <Typography variant="h6" gutterBottom>
                  Sub Tasks
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {task.sub_tasks?.map((subTask) => (
                      <TableRow key={subTask.id}>
                        <TableCell component="th" scope="row">
                          {subTask.title}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Box className="m-5 basis-1/3">
                <Typography variant="h6" gutterBottom>
                  Notes
                </Typography>
                <Typography className="text-wrap">{task.notes}</Typography>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default EnhancedTableDropdown;
