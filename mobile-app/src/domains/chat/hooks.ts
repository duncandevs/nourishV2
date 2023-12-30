import { useMutation, useQueryClient, useQuery } from 'react-query';
import ChatService from './service';
import { ChatMessage } from './types';

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
            const chatEntry: ChatMessage = { message: userMessage, user: 'user'};
            await ChatService.addChatMessageToStorage(chatEntry);
            return ChatService.fetchChatResponse(userMessage);
        },
        {
            onSuccess: async (responseMessage: string) => {
                // Update the existing chatMessages with the new data
                queryClient.setQueryData(ChatKeys.all, (oldData: any) => {
                    // Ensure oldData is not undefined
                    if (!oldData) {
                        return [responseMessage];
                    };
                    // Add responseMessage as a new item to the chatMessages array
                    return [...oldData, responseMessage];
                });
                const chatResponseEntry: ChatMessage = {message: responseMessage, user:'ai'}
                await ChatService.addChatMessageToStorage(chatResponseEntry);
            },
            onError: (error)=>console.log('fetch error - '),
        }
    );

    return { 
        messages,
        getChatResponse,
        isGetChatResponseLoading, 
        status, 
        error,
    };
};
