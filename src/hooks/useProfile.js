import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApiQuery } from "../api/useApiQuery";

export function useProfile() {
    const { user: authUser } = useContext(AuthContext);
    const { data: authUserProfile, ...rest } = useApiQuery("profile", authUser.id);
    return { authUser, authUserProfile, ...rest };
}
