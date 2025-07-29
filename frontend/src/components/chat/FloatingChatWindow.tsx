// src/components/chat/FloatingChatWindow.tsx
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatBox from '../ChatBox';
import { useTranslation } from 'react-i18next';

interface FloatingChatWindowProps {
  open: boolean;
  onClose: () => void;
  roomId: number;
  currentUserId: number;
}

const FloatingChatWindow: React.FC<FloatingChatWindowProps> = ({
  open,
  onClose,
  roomId,
  currentUserId,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 16,
        m: 0,
        '& .MuiDialog-paper': {
          margin: 0,
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '360px',
          height: '450px',
          borderRadius: '12px',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {t('chat-room')} {roomId}
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ChatBox currentUserId={currentUserId} roomId={roomId} />
      </DialogContent>
    </Dialog>
  );
};

export default FloatingChatWindow;
