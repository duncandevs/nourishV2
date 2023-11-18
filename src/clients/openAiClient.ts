import OpenAI from "openai";

export const MODEL = 'gpt-3.5-turbo';
export const IMAGE_MODEL = 'gpt-4-vision-preview';

const openai = new OpenAI({ 
    apiKey: process.env.EXPO_PUBLIC_OPEN_AI_API_KEY, 
    organization: process.env.EXPO_PUBLIC_OPEN_AI_ORGANIZATION 
});



/*
    NOTE: Schemas can be quite extensive and even contain nested objects and arrays IE:
    const schema = {
      "type": "object",
      "properties": {
        "dish": {
          "type": "string",
          "description": "Descriptive title of the dish"
        },
        "ingredients": {
          "type": "array",
          "items": {"type": "string"}
        },
        "instructions": {
          "type": "array",
          "description": "Steps to prepare the recipe.",
          "items": {"type": "string"}
        }
      }
    }
*/
/*
    PROMPT CONSTRUCTOR ->
        you are an agent which helps other AI chat bots answer questions about nutrition. In order to help these other AIs you'll have to construct a prompt which best estimates what the user wants. the user input is a type of food or drink. you're job is to construct a prompt which will best estimate the foods macros. here are good examples of the input to prompt -> (input: apple, prompt: A medium apple), (input: wings, prompt: a typical wings meal). Now write a new prompt given the input: hamburger
*/
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
