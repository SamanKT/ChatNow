import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ImageAlert({
  img,
  setImg,
  text,
  handleMessageSend,
  open,
  setOpen,
  setText,
  handleClearImgInput,
  disabled,
}) {
  const handleClose = () => {
    setOpen(false);
    if (disabled !== "none") {
      setImg("");
      handleClearImgInput();
    }
  };
  let imgUrl = "";
  if (img) {
    if (disabled !== "none") imgUrl = URL.createObjectURL(img);
    else imgUrl = img;
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ display: disabled }}>Send Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <img
              src={imgUrl}
              alt=""
              style={{ width: 200, borderRadius: 3, paddingTop: 20 }}
            />
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
              sx={{ display: disabled }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ display: disabled }}>
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleMessageSend(e);
              setOpen(false);
            }}
            sx={{ display: disabled }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
