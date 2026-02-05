import { Snackbar, Alert } from "@mui/material";

type Props = {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "info";
  onClose: () => void;
};

const AppMessageBox = ({
  open,
  message,
  severity = "success",
  onClose,
}: Props) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity} onClose={onClose} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppMessageBox;
