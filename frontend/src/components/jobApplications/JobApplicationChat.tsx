import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFloatingChatContext } from '../../context/FloatingChatContext';
import { useChatManagement } from '../../hooks/useChatManagement';

interface JobApplicationChatProps {
  recruiterId: number;
  jobSeekerId: number;
}

const JobApplicationChat: React.FC<JobApplicationChatProps> = ({
  recruiterId,
  jobSeekerId,
}) => {
  //const navigate = useNavigate();

  const { roomId, startChat } = useChatManagement();
  const { setActiveRoomId } = useFloatingChatContext();

  /*   const startChat = async () => {
    const res = await fetch('http://localhost:4000/api/v1/chat/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recruiterId, jobSeekerId }),
    });

    const data = await res.json();
    //navigate(`/chat/${data.roomId}`);
    setActiveRoomId(data.roomId); // ✅ trigger floating chat instead of navigate
  }; */

  const openChat = async () => {
    await startChat({ recruiterId, jobSeekerId });
    setActiveRoomId(roomId);
  };

  return (
    <Button onClick={openChat} variant="contained">
      💬 Start Chat
    </Button>
  );
};

export default JobApplicationChat;
