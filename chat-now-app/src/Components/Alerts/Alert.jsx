import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMUI({ open, mode, message }) {
  const [myOpen, setOpen] = React.useState(open);
  React.useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const AlertDeterminer = ({ mode2, message }) => {
    return (
      <Alert
        onClose={handleClose}
        severity={mode2 === 1 ? "success" : "error"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    );
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", justifyContent: "center" }}>
      <Snackbar open={myOpen} autoHideDuration={3000} onClose={handleClose}>
        <div>
          <AlertDeterminer mode2={mode} message={message}></AlertDeterminer>
        </div>
      </Snackbar>
      {/* 
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}
