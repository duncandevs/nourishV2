import axios from "axios";

const MODEL_NAME = "models/text-bison-001";
const BASE_URL = "https://generativelanguage.googleapis.com"
const VERSION = "v1beta2"
const URL = `${BASE_URL}/${VERSION}/${MODEL_NAME}:generateText?key=${process.env.EXPO_PUBLIC_GOOGLE_AI_KEY}`;

const promptString = (searchTerm: string) => `What are the macros in a typical meal or drink of "${searchTerm}". return the response in json: {name: string, calories:number, fat:number, protein:number, carbs:number} dont include any units or ranges. if a range exists ie: 10-20 then return the avergae`;
const stopSequences = [];

const _trimSpecialMarkers1 = (input: string) => input.replace(/```json/, '').replace(/```/, '').trim();
const _trimSpecialMarkers2 = (input: string) => input.replace(/```/, '').replace(/```/, '').trim();

const _parseWithStringMarkers1 = (jsonString: string) => {
    try {
        const trimmedString = _trimSpecialMarkers1(jsonString);
        const nutritionalInfo = JSON.parse(trimmedString);
        return nutritionalInfo;
    } catch (error) {
        return null;
    }
};
const _parseWithStringMarkers2 = (jsonString: string) => {
    try {
        const trimmedString = _trimSpecialMarkers2(jsonString);
        const nutritionalInfo = JSON.parse(trimmedString);
        return nutritionalInfo;
    } catch (error) {
        return null;
    }
};

const _parseWithoutStringMarkers = (text: string) => {
    try {
        return JSON.parse(text)
    } catch (error) {
        return null
    };
}

const _parseGoogleResult = (unParsedString: string) => {
    let result = _parseWithoutStringMarkers(unParsedString);

    if (!result) {
        result = _parseWithStringMarkers1(unParsedString);
    };

    if(!result) {
        result = _parseWithStringMarkers2(unParsedString);
    };

    return result;
};

const options = {
    // optional, 0.0 always uses the highest-probability result
    temperature: 0.7,
    // optional, how many candidate results to generate
    candidateCount: 1,
    // optional, number of most probable tokens to consider for generation
    top_k: 40,
    // optional, for nucleus sampling decoding strategy
    top_p: 0.95,
    // optional, maximum number of output tokens to generate
    max_output_tokens: 1024,
    // optional, sequences at which to stop model generation
};

export const fetchGoogleAIResult = async (searchTerm: string) => {
    const params = {
        prompt: {
            text: promptString(searchTerm)
        },
        ...options
    };
    try {
        const {data } = await axios.post(URL, params);
        const unParsedString = data?.candidates?.[0]?.output;
        const result = _parseGoogleResult(unParsedString);
        return result
    } catch (error) {
        return null
    }
};