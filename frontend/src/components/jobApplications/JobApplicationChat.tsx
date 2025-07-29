import { Button } from '@mui/material';
import { useFloatingChatContext } from '../../context/FloatingChatContext';
import { useChatManagement } from '../../hooks/useChatManagement';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const openChat = async () => {
    const room = await startChat({ recruiterId, jobSeekerId });
    setActiveRoomId(room.roomId); // Use the returned roomId directly
  };

  return (
    <Button onClick={openChat} variant="contained">
      💬 {t('job-application-start-chat')}
    </Button>
  );
};

export default JobApplicationChat;
