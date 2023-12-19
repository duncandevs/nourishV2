import { getChatGPTReply } from '../../../services/chat';
import { _validatePost } from '@/services/api';


const handler = async (req: any, res: any) => {
    try {
        _validatePost({res, req});
        const body = req.body;
        const userMessage = body?.message;
        const message = await getChatGPTReply(userMessage);
        const data =  { message };
        res.send(data);   
    } catch (error) {
        res.status(500).end('Server Error!')
    };
};

export default handler
