export const _validatePost = ({ res, req }: {res:any, req:any}) => {
    if (req.method !== "POST") res.status(404).end("Method not allowed");
};