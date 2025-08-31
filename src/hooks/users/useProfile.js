import { useContext } from "react";
import { AuthContext } from "@/context";
import { useApiQuery } from "@/api";

export function useProfile() {
    const { user: authUser } = useContext(AuthContext);
    const { data: authUserProfile, ...rest } = useApiQuery("profile", authUser.id);
    return { authUser, authUserProfile, ...rest };
}
