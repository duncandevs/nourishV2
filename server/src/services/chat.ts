import { generateChatGPTReply } from "@/clients/openAiClient"

export const getChatGPTReply = async (message: string) => {
    try {
        const response = await generateChatGPTReply({ message });
        const data = response?.choices?.[0]?.message?.content;
        if(data) return { data, error: null};

        throw("Error fetching chat completion")
    } catch (error) {
        return { data: null, error };
    };
};