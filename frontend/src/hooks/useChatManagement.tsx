import { useEffect, useState } from 'react';
import { startChat as startChatAPI } from '../services/chatService';
import { Chat } from '../interfaces/interfaces';

export const useChatManagement = () => {
  const [roomId, setRoomId] = useState<number | null>(null);

  /*   useEffect(() => {
    fetchCompanies();
  }, []); */

  const startChat = async (newChat: Chat) => {
    try {
      const data = await startChatAPI(newChat);
      setRoomId(data.roomId);
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  /* const createCompany = async (company: Company) => {
    try {
      const newCompany = await createCompanyAPI(company);
      setCompanies((prev) => [...prev, newCompany]);
      setSnackStatus({
        open: true,
        action: 'created',
        source: 'CompaniesList',
        severity: 'success',
      });
      return newCompany; //to be able to retrieve its id for auto select it in the add company from creating a new job
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const updateCompany = async (company: Company) => {
    try {
      const updatedCompany = await updateCompanyAPI(company);
      setCompanies((prev) =>
        prev.map((com) => (com.id === updatedCompany.id ? updatedCompany : com))
      );
      setSnackStatus({
        open: true,
        action: 'updated',
        source: 'CompaniesList',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  };

  const deleteCompany = async (companyId: number) => {
    try {
      await deleteCompanyAPI(companyId);
      setCompanies((prev) => prev.filter((com) => com.id !== companyId));
      setSnackStatus({
        open: true,
        action: 'deleted',
        source: 'CompaniesList',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error within the hook->', error);
    }
  }; */

  return {
    roomId,
    startChat,
  };
};
