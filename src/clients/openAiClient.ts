import OpenAI from "openai";

export const MODEL = 'gpt-3.5-turbo';
export const IMAGE_MODEL = 'gpt-4-vision-preview';
const API_KEY = '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';
const ORGANIZATION = 'org-60p5wVxI209JrRzsR5aC3xot'

const openai = new OpenAI({ apiKey: API_KEY, organization: ORGANIZATION });


export const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "calories": {
            "type": "number"
        },
        "fat": {
            "type": "number"
        },
        "protein": {
            "type": "number"
        },
        "carbs": {
            "type": "number"
        },
    },
};


// TODO: see https://platform.openai.com/docs/api-reference/chat/create for more on chat completions and JSON schema definition
const constructSearchPrompt = (searchTerm: string) => `Estimate the number of macros for ${searchTerm}.`

export const fetchGptByText = async ({ searchTerm }: {searchTerm: string}) => {
    const prompt = constructSearchPrompt(searchTerm)
    return openai.chat.completions.create({
        messages: [
            { role: "system", content: "helpful assistant" },
            { role: "user", content: prompt }
        ],
        model: MODEL,
        functions: [{ name: "set_food_json", parameters: schema }],
        function_call: {name: 'set_food_json'}
    });
};

export const fetchGptByImage = async (base64Image: string) => {
    const prompt = "whats the name of the meal or drink in this photo?"
    return openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            { role: "system", content: "an assistant which only responds with names" },
            {
                role: "user",
                content: [
                    { type: "text", text: prompt },
                    // Accepts Either a URL of the image or the base64 encoded image data.
                    { type: "image_url", image_url: {url: `data:image/jpeg;base64,${base64Image}`}},
                ],
            },
        ]
      });
};
