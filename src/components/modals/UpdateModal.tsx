import { Edit } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { PickerValue } from '@mui/x-date-pickers/internals';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import { useTasksContext } from '../../contexts/tasksContext';
import type { UpdateTask } from '../../types/task';
import { PRIORITIES, STATUSES } from '../../types/task';

interface UpdateModalProps {
    open: boolean
    selected: string[]
    onClose: () => void
    onUpdate: () => void
}

// TODO: Logic needs to be move somewhere else! -> userForm() ?
// TODO: Create Subtasks
const UpdateModal = ({ open, selected, onClose, onUpdate }: UpdateModalProps) => {
    const { updateTask, createUpdateTask } = useTasksContext()
    const [task, setTask] = useState<UpdateTask>(createUpdateTask())

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | PickerValue,
        fieldName?: string
    ) => {
        if (fieldName == "due_date") {
            const newDueDate = e as PickerValue
            setTask({ ...task, ["due_date"]: newDueDate?.utc(true).toDate() })
            return
        }

        const { name, value } = (e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>).target
        if (name == "priority") {
            setTask({ ...task, [name]: PRIORITIES.find((priority) => priority.value == value) || PRIORITIES[0] })
        } else if (name == "status") {
            setTask({ ...task, [name]: STATUSES.find((status) => status.value == value) || STATUSES[0] })
        } else {
            setTask({ ...task, [name]: value })
        }
    }
    // TODO: Add toast for failure or success
    const handleUpdateTasks = () => {
        selected.forEach((id) => updateTask(id, task))
        onUpdate()
        onClose()
    }

    const handleClose = () => {
        setTask(createUpdateTask())
        onClose()
    }

    // TODO: Add form validation
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

                    <Box className='ms-1 flex justify-between items-center'>
                        <Typography variant='h4'>
                            Update Task{selected.length > 1 ? "s" : ""}
                        </Typography>

                        <IconButton
                            onClick={() => handleClose()}
                        >
                            <CloseIcon fontSize='large' />
                        </IconButton>
                    </Box>

                    <Box className='m-2'>
                        <TextField
                            variant="standard"
                            multiline
                            rows={3}
                            className='w-full'
                            label="Notes"
                            name="notes"
                            value={task.notes}
                            onChange={(e) => handleChange(e)}
                        />
                    </Box>

                    <Box className='m-2'>
                        <TextField
                            variant="standard"
                            select
                            className='w-full'
                            label="Status"
                            name="status"
                            defaultValue=""
                            onChange={(e) => handleChange(e)}
                        >
                            {STATUSES.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    <Box className='flex'>
                                        <Box className='ms-2'>
                                            <CircleIcon
                                                className='mb-1'
                                                fontSize="small"
                                                style={{ color: option.colour }}
                                            />
                                        </Box>
                                        <Box className='ms-2'>
                                            {option.label}
                                        </Box>
                                    </Box>
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Box className='m-2'>
                        <TextField
                            variant="standard"
                            select
                            className='w-full'
                            label="Priority"
                            name="priority"
                            defaultValue=""
                            onChange={(e) => handleChange(e)}
                        >
                            {PRIORITIES.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    <Box className='flex'>
                                        <Box className='ms-2'>
                                            <CircleIcon
                                                className='mb-1'
                                                fontSize="small"
                                                style={{ color: option.colour }}
                                            />
                                        </Box>
                                        <Box className='ms-2'>
                                            {option.label}
                                        </Box>
                                    </Box>
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Box className='m-2'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label="Due Date"
                                    onChange={(e) => handleChange(e, "due_date")}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>

                    <Box className='m-2 my-3 flex'>
                        <Button
                            className='grow'
                            variant="contained"
                            color='warning'
                            onClick={() => handleUpdateTasks()}
                            endIcon={<Edit />}
                        >
                            <Typography>
                                Update Task{selected.length > 1 ? "s" : ""}
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default UpdateModal