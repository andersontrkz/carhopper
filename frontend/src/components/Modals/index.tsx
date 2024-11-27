import { DialogTitle, DialogContent, DialogActions, Dialog, Typography, Button } from '@mui/material';

import { closeModal } from '@/redux/slices/modal.slice';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';

function Modal() {
  const dispatch = useAppDispatch();
  const { isOpen, message, onConfirm } = useAppSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Confirmação</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" type="button">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} variant="contained" type="button">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
