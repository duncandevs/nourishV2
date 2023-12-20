import { getChatGPTReply } from '../../../services/chat';
import { _validatePost } from '@/services/api';


const handler = async (req: any, res: any) => {
    try {
        _validatePost({res, req});
        const body = req.body;
        const userMessage = body?.message;
        const {data: message} = await getChatGPTReply(userMessage);
        const result =  { message };
        res.send(result);   
    } catch (error) {
        res.status(500).end('Server Error!')
    };
};

export default handler
