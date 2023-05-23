import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ImageAlert({
  img,
  text,
  handleMessageSend,
  open,
  setOpen,
  setText,
}) {
  const handleClose = () => {
    setOpen(false);
  };
  let imgUrl = "";
  if (img) imgUrl = URL.createObjectURL(img);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <img src={imgUrl} alt="" style={{ width: 200, borderRadius: 3 }} />
          </DialogContentText>
          <form action="">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              // label="Email Address"
              type="text"
              fullWidth
              variant="standard"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleMessageSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
