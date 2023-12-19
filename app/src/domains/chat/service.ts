import axios from "axios"

const SERVER_URL = 'http://localhost:3000';

export const getChatResponse = async (message: string) => {
    const CHAT_URL = SERVER_URL + '/api/v1/chat';
    const response = await axios.post(CHAT_URL, { message });
    return response?.data?.message?.data;
}; 