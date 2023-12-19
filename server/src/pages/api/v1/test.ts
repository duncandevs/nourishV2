import {TEST_SHARED} from '@shared/domains'

const handler = async (req: any, res: any) => {
    console.log('TEST_SHARED - ', TEST_SHARED)
    res.send('OK');
};

export default handler
