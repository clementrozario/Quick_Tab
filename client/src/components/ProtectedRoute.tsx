import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/useAuth";


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoading, isError, data } = useAuth();
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <Navigate to='/login' replace />
    }
    return <>{children}</>
}