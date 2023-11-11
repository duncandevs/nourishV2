import OpenAI from "openai";

export const MODEL = 'gpt-3.5-turbo';
export const IMAGE_MODEL = 'gpt-4-vision-preview';
const API_KEY = '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';
const ORGANIZATION = 'org-60p5wVxI209JrRzsR5aC3xot'

const openai = new OpenAI({ apiKey: API_KEY, organization: ORGANIZATION });

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

export const fetchGptByImage = async () => {
    const prompt = "estimate the macros of the food or drink in this image. return results in json with the format {name: string, calories:number, fat:number, protein:number, carbs:number}. please do not respond with any other text even if you are unsure."
    return openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              // Accepts Either a URL of the image or the base64 encoded image data.
              { type: "image_url", image_url: {url: "https://www.africanbites.com/wp-content/uploads/2020/07/IMG_8963-2.jpg"}},
            ],
          },
        ]
      });
}
