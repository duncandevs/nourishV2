export type ChatUser = 'user' | 'ai'

export type ChatMessage = {
    user: ChatUser
    message: string;
};
