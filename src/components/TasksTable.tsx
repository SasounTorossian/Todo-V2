import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import * as React from "react";
import { useState } from "react";
import { useTasksContext } from "../contexts/tasksContext";
import useTable from '../hooks/useTable';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableRow from './EnhancedTableRow';
import CreateModal from "./modals/CreateModal";
import DeleteModal from "./modals/DeleteModal";
import UpdateModal from "./modals/UpdateModal";
import Toolbar from "./Toolbar";

const TasksTable = () => {
    const { tasks } = useTasksContext()
    const { selected, setSelected, handleSelectAll, handleSelect } = useTable()
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)

    return (
        <React.Fragment>
            <Toolbar
                selected={selected}
                setOpenCreateModal={setOpenCreateModal}
                setOpenDeleteModal={setOpenDeleteModal}
                setOpenUpdateModal={setOpenUpdateModal}
            />

            <TableContainer className='px-5'>
                <Table aria-label="collapsible table">

                    <EnhancedTableHead
                        numSelected={selected.length}
                        handleSelectAll={(e) => handleSelectAll(tasks, e)}
                        rowCount={tasks.length}>
                    </EnhancedTableHead>

                    <TableBody>
                        {tasks.map((task) => (
                            <EnhancedTableRow
                                key={task.id}
                                task={task}
                                selected={selected}
                                handleSelect={() => handleSelect(task)}
                                setSelected={setSelected}
                                setOpenDeleteModal={setOpenDeleteModal}
                                setOpenUpdateModal={setOpenUpdateModal}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateModal
                open={(openCreateModal)}
                onClose={() => setOpenCreateModal(false)}
            />

            <DeleteModal
                open={(openDeleteModal)}
                selected={selected}
                onDelete={() => setSelected([])}
                onClose={() => setOpenDeleteModal(false)}
            />

            <UpdateModal
                open={(openUpdateModal)}
                selected={selected}
                onUpdate={() => setSelected([])}
                onClose={() => setOpenUpdateModal(false)}
            >
            </UpdateModal>
        </React.Fragment>
    );
}

export default TasksTable