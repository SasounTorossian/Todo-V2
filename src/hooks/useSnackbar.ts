import { useState } from "react";

const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const closeSnackbar = () => {
    setOpen(false);
  };

  const showSnackbar = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  return {
    open,
    message,
    showSnackbar,
    closeSnackbar,
  };
};

export default useSnackbar;
