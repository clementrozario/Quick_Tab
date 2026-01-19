import { useQuery } from "@tanstack/react-query";
import { getMe } from "./api";

export const useAuth =  () => {
    const query = useQuery({
        queryKey: ['auth'],
        queryFn: getMe,
        retry:false
    })
    return query
}