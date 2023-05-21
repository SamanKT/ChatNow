import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMUI({ open, mode }) {
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

  return (
    <Stack spacing={2} sx={{ width: "100%", justifyContent: "center" }}>
      <Snackbar open={myOpen} autoHideDuration={3000} onClose={handleClose}>
        {mode === 1 ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            You have logged in successfully!
          </Alert>
        ) : (
          <Alert severity="error">User/Password not found!</Alert>
        )}
      </Snackbar>
      {/* 
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}
