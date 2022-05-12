import { IconButton, Snackbar } from "@mui/material";
import theme from "../styles/theme";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export const AlertMessage = ({ type, message, handleClose }) => {

  const types = {
    error: theme.error,
    success: theme.success,
  };

  const action = (
    <IconButton onClick={handleClose}>
      <CloseIcon sx={{ "&": { color: types[type] } }} />
    </IconButton>
  );

  return (
    <Snackbar
      sx={{
        "& .MuiPaper-root": {
          background: "#000",
          color: types[type],
          boxShadow: `0 0 5px ${types[type]}, 0 0 10px ${types[type]}`,
        },
      }}
      open={true}
      autoHideDuration={5000}
      message={message}
      action={action}
    />
  );
};