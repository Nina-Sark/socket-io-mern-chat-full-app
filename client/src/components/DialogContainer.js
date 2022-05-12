import { Dialog } from "@mui/material";
import theme from "../styles/theme";

export const DialogContainer = ({
  children,
  open,
  setOpen,
  onClose = () => null,
}) => {
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          background: "#000",
          boxShadow: `0 0 520px ${theme.secondaryAccentColor}, 0 0 15px ${theme.secondaryAccentColor}`,
          padding: "0 1em",
        },
        "&.MuiDialog-root": {
          backdropFilter: "blur(10px)",
        },
      }}
      open={open}
      onClose={() => {
        onClose();
        setOpen(false);
      }}
    >
      {children}
    </Dialog>
  );
};
