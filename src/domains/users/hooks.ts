import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import UserService from "./services";
import { useAppState } from "../../state";

const userKeys = {
    profilePicture: ['profilePicture']
};

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
};

export const useProfilePicture = () => {
    const fetchProfilePicture = async () => {
        return await UserService.getProfilePicFromStorage();
    };

    const { data: userProfilePic, isLoading } = useQuery(
      userKeys.profilePicture, // Unique key identifying the query
      fetchProfilePicture // Fetch function
    );
    const queryClient = useQueryClient();
  
    const { mutate: setNewProfilePic, isSuccess } = useMutation(
      (pic: string) => UserService.setProfilePicToStorage(pic), // Mutation function
      {
        onSuccess: () => {
          queryClient.invalidateQueries(userKeys.profilePicture);
        },
      }
    );

    return {
      userProfilePic,
      isLoading,
      setNewProfilePic,
      isSuccess,
    };
  };