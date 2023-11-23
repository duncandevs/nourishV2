import { useEffect, useState } from "react";
import UserService from "./services";
import { useAppState } from "../../state";

export const useUserAuth = () => {
    const [ user, setUser ] = useState(null);

    useEffect(()=>{
        UserService.getUserFromStorage()
            .then((res)=>setUser(res))
    }, [UserService]);

    return user;
};

export const useUser = () => {
    const { user: { data: user } } = useAppState();
    return user;
}