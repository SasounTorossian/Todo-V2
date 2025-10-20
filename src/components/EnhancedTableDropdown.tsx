import { Box, Collapse, Table, TableBody, TableHead, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import type { Task } from '../types/task';
import { formatTime } from '../utils/time';

interface EnhancedTableDropdownProps {
    open: boolean
    task: Task
}

// TODO: Is not extending all the way across screen
const EnhancedTableDropdown = ({ open, task }: EnhancedTableDropdownProps) => {
    return (
        <React.Fragment>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box className='flex gap-10'>
                            <Box className="m-5 basis-2/3">
                                <Typography variant="h6" gutterBottom>
                                    Sub Tasks
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell align='right'>Creation Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {task.sub_tasks?.map((subTask) => (
                                            <TableRow key={subTask.id}>
                                                <TableCell component="th" scope="row">
                                                    {subTask.title}
                                                </TableCell>
                                                <TableCell align="right">{formatTime(task.created_at)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                            <Box className="m-5 basis-1/3">
                                <Typography variant="h6" gutterBottom>
                                    Notes
                                </Typography>
                                <Typography className='text-wrap'>
                                    {task.notes}
                                </Typography>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default EnhancedTableDropdown