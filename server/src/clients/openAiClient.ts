import OpenAI from "openai";

const GPT_MODELS = {
    'gpt-3.5-turbo':  'gpt-3.5-turbo',
    'gpt-4-1106-preview': 'gpt-4-1106-preview',
    'gpt-4-vision-preview': 'gpt-4-vision-preview'
}

const openai = new OpenAI({ 
    apiKey: process.env.OPEN_AI_API_KEY, 
    organization: process.env.OPEN_AI_ORGANIZATION 
});

export const generateChatGPTReply = async ({ message }: {message: string}) => {
    return openai.chat.completions.create({
        messages: [
            { role: "system", content: "helpful assistant" },
            { role: "user", content: message }
        ],
        model: GPT_MODELS["gpt-4-1106-preview"],
    });
};