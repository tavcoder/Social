import { useApiMutation } from "@/api";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export function useUpdateProfile() {
  const { setUser } = useContext(AuthContext);

  const mutation = useApiMutation("updateProfile", ["profile"]);

  const updateProfile = (form) =>
    mutation.mutate(
      { method: "PUT", ...form },
      {
        onSuccess: (data) => {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        },
      }
    );

  return { updateProfile, ...mutation };
}
