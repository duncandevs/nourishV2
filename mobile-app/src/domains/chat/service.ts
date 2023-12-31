import axios from "axios"
import { getItemFromStorage, setItemToAsyncStorage } from '../../utility';
import { ChatMessage } from "./types";

const SERVER_URL = 'http://localhost:3000';
const CHAT_STORAGE_KEY = 'chatMessages';

const fetchChatResponse = async (message: string) => {
    const CHAT_URL = SERVER_URL + '/api/v1/chat';
    const response =  await axios.post(CHAT_URL, { message });
    return response?.data?.message;
}; 

const loadChatMessagesToStorage = async (): Promise<ChatMessage[]> => {
    const chatMessages: ChatMessage[] = await getItemFromStorage(CHAT_STORAGE_KEY);
    return chatMessages || [];
};

const addChatMessageToStorage = async (newChatMessage: ChatMessage) => {
    const chatMessages = await loadChatMessagesToStorage();
    const updatedMessages: ChatMessage[] = [...chatMessages, newChatMessage].slice(-50); // Keep only the last 50 messages
    await setItemToAsyncStorage(CHAT_STORAGE_KEY, updatedMessages);
};

export default { 
    fetchChatResponse,
    loadChatMessagesToStorage,
    addChatMessageToStorage,
};