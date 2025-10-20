import { useState } from "react";
import type { Task } from "../types/task";

const useTable = () => {
    const [selected, setSelected] = useState<Task[]>([]);

    const handleSelectAll = (tasks: Task[], event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(tasks);
            return;
        }
        setSelected([]);
    };

    const handleSelect = (task: Task) => {
        const selectedIndex = selected.indexOf(task);
        let newSelected: Task[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, task);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    return {
        selected,
        setSelected,
        handleSelectAll,
        handleSelect,
    }
}

export default useTable
