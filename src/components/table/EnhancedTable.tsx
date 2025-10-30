import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { useState } from "react";
import useSnackbar from "../../hooks/useSnackbar";
import useTable from "../../hooks/useTable";
import { useTasksContext } from "../../hooks/useTaskContext";
import { successMessage } from "../../utils/message";
import CreateModal from "../modals/CreateModal";
import DeleteModal from "../modals/DeleteModal";
import UpdateModal from "../modals/UpdateModal";
import EnhancedSnackbar from "../snackbar/EnhancedSnackbar";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableRow from "./EnhancedTableRow";
import EnhancedToolbar from "./EnhancedToolbar";

const EnhancedTable = () => {
  const { tasks } = useTasksContext();
  const { selected, setSelected, handleSelectAll, handleSelect } = useTable();
  const { open, message, showSnackbar, closeSnackbar } = useSnackbar();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const onAdd = () => {
    showSnackbar(successMessage("Created", selected));
    setSelected([]);
  };

  const onDelete = () => {
    showSnackbar(successMessage("Deleted", selected));
    setSelected([]);
  };

  const onUpdate = () => {
    showSnackbar(successMessage("Updated", selected));
    setSelected([]);
  };

  return (
    <Paper className="flex flex-col px-5 pt-0 pb-10 overflow-hidden">
      <EnhancedToolbar
        selected={selected}
        setOpenCreateModal={setOpenCreateModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setOpenUpdateModal={setOpenUpdateModal}
      />

      <TableContainer className="overflow-auto">
        <Table
          stickyHeader
          className="table-fixed w-100"
          aria-label="collapsible table"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            handleSelectAll={(e) => handleSelectAll(tasks, e)}
            rowCount={tasks.length}
          ></EnhancedTableHead>

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
        open={openCreateModal}
        onAdd={() => onAdd()}
        onClose={() => setOpenCreateModal(false)}
      />

      <DeleteModal
        open={openDeleteModal}
        selected={selected}
        onDelete={() => onDelete()}
        onClose={() => setOpenDeleteModal(false)}
      />

      <UpdateModal
        open={openUpdateModal}
        selected={selected}
        onUpdate={() => onUpdate()}
        onClose={() => setOpenUpdateModal(false)}
      ></UpdateModal>

      <EnhancedSnackbar open={open} message={message} onClose={closeSnackbar} />
    </Paper>
  );
};

export default EnhancedTable;
