import { useQuery } from "@tanstack/react-query";
import { getMe } from "./api";
import { useEffect } from 'react';
import { useUserStore } from "../store/useUseStore";

export const useAuth = () => {
    const setUserProfile = useUserStore((state) => state.setUserProfile)
    
    const query = useQuery({
        queryKey: ['auth'],
        queryFn: getMe,
        retry: false,
    })
    
    useEffect(() => {
        if (query.data) {
            setUserProfile(query.data)
        }
    }, [query.data, setUserProfile])
    
    return query
}
