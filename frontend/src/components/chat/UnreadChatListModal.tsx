import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useEffect } from 'react';
import { useChatManagement } from '../../hooks/useChatManagement';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  onClose: () => void;
  unreadRooms: number[];
  onSelectRoom: (roomId: number) => void;
}

const UnreadChatListModal: React.FC<Props> = ({
  open,
  onClose,
  unreadRooms,
  onSelectRoom,
}) => {
  const { chatUsersInfo, roomDetails } = useChatManagement();
  const { t } = useTranslation();

  useEffect(() => {
    if (!open || unreadRooms.length === 0) return;

    const fetchRoomData = async () => {
      await chatUsersInfo(unreadRooms);
    };

    fetchRoomData();
  }, [open, unreadRooms]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('chat-unread-title')}</DialogTitle>
      <DialogContent>
        <List>
          {roomDetails?.map(({ roomId, participants }) => (
            <ListItem key={roomId}>
              <ListItemButton onClick={() => onSelectRoom(roomId)}>
                <ListItemText
                  primary={`${participants.recruiter} ↔ ${participants.jobSeeker}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default UnreadChatListModal;
