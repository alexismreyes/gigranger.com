import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  unreadRooms: number[];
  onSelectRoom: (roomId: number) => void;
}

interface RoomDetails {
  roomId: number;
  participants: {
    recruiter: string;
    jobSeeker: string;
  };
}

const UnreadChatListModal: React.FC<Props> = ({
  open,
  onClose,
  unreadRooms,
  onSelectRoom,
}) => {
  //const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState<RoomDetails[]>([]);

  /*  const handleSelectRoom = (roomId: number) => {
    navigate(`/chat/${roomId}`);
    onClose();
  }; */

  useEffect(() => {
    if (!open || unreadRooms.length === 0) return;

    const fetchRoomData = async () => {
      try {
        const res = await fetch(
          'http://localhost:4000/api/v1/chat/room-usernames',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomIds: unreadRooms }),
          }
        );

        const data = await res.json();
        setRoomDetails(data);
      } catch (err) {
        console.error('❌ Failed to fetch room usernames:', err);
      }
    };

    fetchRoomData();
  }, [open, unreadRooms]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Unread Chats</DialogTitle>
      <DialogContent>
        <List>
          {roomDetails.map(({ roomId, participants }) => (
            <ListItem key={roomId}>
              {/* <ListItemButton onClick={() => handleSelectRoom(roomId)}> */}
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
