import CircleIcon from "@mui/icons-material/Circle";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import type { ChangeEventHandler, ReactNode } from "react";
import type { Priority, Status } from "../../types/task";

interface DropdwonProps {
  label: string;
  name: string;
  options: Priority[] | Status[];
  required?: boolean;
  defaultValue?: unknown;
  value?: unknown;
  onChange:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  error?: boolean;
  helperText?: ReactNode;
}

const Dropdown = ({
  label,
  name,
  options,
  required,
  defaultValue,
  value,
  onChange,
  error,
  helperText,
}: DropdwonProps) => {
  return (
    <TextField
      variant="standard"
      select
      className="w-full"
      label={label}
      name={name}
      required={required}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Box className="flex">
            <Box className="ms-2">
              <CircleIcon
                className="mb-1"
                fontSize="small"
                style={{ color: option.colour }}
              />
            </Box>
            <Box className="ms-2">{option.label}</Box>
          </Box>
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Dropdown;
