import { Button } from '@mui/material';
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
  const { startChat } = useChatManagement();
  const { setActiveRoomId } = useFloatingChatContext();

  const openChat = async () => {
    const room = await startChat({ recruiterId, jobSeekerId });
    setActiveRoomId(room.roomId); // Use the returned roomId directly
  };

  return (
    <Button onClick={openChat} variant="contained">
      💬 Start Chat
    </Button>
  );
};

export default JobApplicationChat;
