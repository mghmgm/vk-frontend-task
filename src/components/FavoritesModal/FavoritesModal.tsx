import { Box, Typography, Modal, Button } from '@mui/material';

interface FavoritesModalProps {
  open: boolean;
  isFavorite: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const FavoritesModal = ({ open, isFavorite, onClose, onConfirm }: FavoritesModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
          {isFavorite ? 'Удалить из избранного?' : 'Добавить в избранное?'}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            onClick={onClose} 
            variant="outlined"
            color="inherit"
          >
            Отмена
          </Button>
          <Button 
            onClick={onConfirm} 
            variant="contained"
            color={isFavorite ? 'error' : 'primary'}
          >
            {isFavorite ? 'Удалить' : 'Добавить'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FavoritesModal;