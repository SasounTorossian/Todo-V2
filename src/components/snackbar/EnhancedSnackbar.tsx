import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import type {
  SnackbarCloseReason,
  SnackbarOrigin,
} from "@mui/material/Snackbar";
import { COLOURS } from "../../constants/colours";

interface EnhancedSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const EnhancedSnackbar = ({
  open,
  onClose,
  message,
}: EnhancedSnackbarProps) => {
  const snackOrigin: SnackbarOrigin = {
    vertical: "bottom",
    horizontal: "right",
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") return;
    onClose();
  };

  const snackbarAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      action={snackbarAction}
      anchorOrigin={snackOrigin}
    >
      <SnackbarContent
        sx={{
          backgroundColor: COLOURS.green,
          color: COLOURS.white,
          fontSize: "1rem",
          fontWeight: "500",
          lineHeight: "1.5rem",
        }}
        message={message}
      />
    </Snackbar>
  );
};

export default EnhancedSnackbar;
