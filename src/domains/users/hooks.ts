import { useEffect, useState } from "react";
import UserService from "./services";

export const useUserAuth = () => {
    const [ user, setUser ] = useState(null);

    useEffect(()=>{
        UserService.getUserFromStorage()
            .then((res)=>setUser(res))
    }, [UserService]);

    return user;
};