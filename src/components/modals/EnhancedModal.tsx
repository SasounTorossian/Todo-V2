import { Box, Modal } from "@mui/material";
import type { ReactNode } from "react";

interface EnhancedModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const EnhancedModal = ({ open, onClose, children }: EnhancedModalProps) => {
  return (
    <Modal open={open} onClose={() => onClose()}>
      <Box
        sx={{ bgcolor: "background.paper" }}
        className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] border-1 border-white -2xl p-4"
      >
        {children}
      </Box>
    </Modal>
  );
};

export default EnhancedModal;
