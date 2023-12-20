import { useMutation, useQueryClient, useQuery } from 'react-query';
import ChatService from './service';

export const ChatKeys = {
    all: ['chatMessages']
};

export const useGptTextChat = () => {
    const queryClient = useQueryClient();
    const {data: messages } = useQuery(ChatKeys.all, () => {
        return ChatService.loadChatMessagesToStorage();
    });

    const { mutateAsync: getChatResponse, status, error, isLoading: isGetChatResponseLoading } = useMutation(
        async (userMessage:string) => {
            await ChatService.addChatMessageToStorage(userMessage);
            return ChatService.fetchChatResponse(userMessage);
        },
        {
            onSuccess: async (newData) => {
                // Update the existing chatMessages with the new data
                queryClient.setQueryData(ChatKeys.all, (oldData: any) => {
                    // Ensure oldData is not undefined
                    if (!oldData) {
                        return [newData];
                    };
                    // Add newData as a new item to the chatMessages array
                    return [...oldData, newData];
                });
                await ChatService.addChatMessageToStorage(newData);
            }
        }
    );

    const addNewChatMessageToStorage = async (msg:string) => {
        await ChatService.addChatMessageToStorage(msg);
    }

    return { 
        messages,
        getChatResponse,
        isGetChatResponseLoading, 
        status, 
        error,
        addNewChatMessageToStorage, 
    };
};
