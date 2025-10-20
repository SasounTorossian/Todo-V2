import { Delete } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, IconButton, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import type { Task } from '../types/task';
import { formatTime } from '../utils/time';
import EnhancedTableDropdown from './EnhancedTableDropdown';


interface EnhancedTableRowProps {
    task: Task,
    selected: string[]
    handleSelect: (event: React.MouseEvent<unknown>, id: string) => void,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>
}

// TODO: Sort out spacing between row elements
const EnhancedTableRow = ({ task, selected, handleSelect, setSelected, setOpenDeleteModal, setOpenUpdateModal }: EnhancedTableRowProps) => {
    const [open, setOpen] = React.useState(false);
    let isItemSelected = false
    if (selected) {
        isItemSelected = selected.includes(task.id);
    }

    const handleDelete = () => {
        setSelected([task.id])
        setOpenDeleteModal(true)
    }

    const handleUpdate = () => {
        setSelected([task.id])
        setOpenUpdateModal(true)
    }

    return (
        <React.Fragment>
            <TableRow
                key={task.id}
                selected={isItemSelected}
                className='border-solid'
            >
                <TableCell
                    padding="checkbox"
                >
                    <Checkbox
                        color="primary"
                        aria-checked={isItemSelected}
                        checked={isItemSelected}
                        onClick={(event) => handleSelect(event, task.id)}
                    />
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                    <Typography sx={{ fontWeight: 'bold' }}>
                        {task.title}
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Box className="flex items-center justify-end">
                        <CircleIcon
                            className='me-2'
                            fontSize="small"
                            style={{ color: task.status.colour }}
                        />
                        <Typography>
                            {task.status.label}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell align="right">
                    <Box className="flex items-center justify-end">
                        <CircleIcon
                            className='me-2'
                            fontSize="small"
                            style={{ color: task.priority.colour }}
                        />
                        <Typography>
                            {task.priority.label}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell align="right">
                    <Typography>
                        {formatTime(task.created_at)}
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography>
                        {task.due_date ? formatTime(task.due_date) : "N/A"}
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <IconButton
                        color='primary'
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    <IconButton
                        color='warning'
                        aria-label="edit row"
                        size="small"
                        onClick={() => handleUpdate()}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        color='error'
                        aria-label="delete row"
                        size="small"
                        onClick={() => handleDelete()}
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </TableCell>
                <TableCell></TableCell>
            </TableRow>

            <EnhancedTableDropdown open={open} task={task} />
        </React.Fragment>
    );
}

export default EnhancedTableRow