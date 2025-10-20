import { Delete } from "@mui/icons-material";
import Add from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Container } from "@mui/material";
import Button from '@mui/material/Button';
import * as React from "react";
import type { Task } from "../types/task";

interface ToolbarProps {
    selected: Task[]
    setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Toolbar = ({ selected, setOpenCreateModal, setOpenDeleteModal, setOpenUpdateModal }: ToolbarProps) => {
    return (
        <React.Fragment>
            <Container className="flex justify-end gap-5 mt-5">
                {selected.length > 0 && (
                    <Button
                        className="w-45"
                        variant='outlined'
                        color="warning"
                        endIcon={<EditIcon />}
                        onClick={() => setOpenUpdateModal(true)}
                    >
                        <Box className='mt-1'>
                            Update {selected.length} Task{selected.length > 1 ? "s" : ""}
                        </Box>
                    </Button>
                )}
                {selected.length > 0 && (
                    <Button
                        className="w-45"
                        variant='outlined'
                        color='error'
                        endIcon={<Delete />}
                        onClick={() => setOpenDeleteModal(true)}
                    >
                        <Box className='mt-1'>
                            Delete {selected.length} Task{selected.length > 1 ? "s" : ""}
                        </Box>
                    </Button>
                )}
                <Button
                    className="w-45"
                    variant='outlined'
                    color='primary'
                    endIcon={<Add />}
                    onClick={() => setOpenCreateModal(true)}
                >
                    <Box className='mt-1'>
                        Add New Task
                    </Box>
                </Button>
            </Container>
        </React.Fragment>
    )
}

export default Toolbar