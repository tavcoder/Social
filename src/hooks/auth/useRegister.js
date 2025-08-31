import { useApiMutation } from "@/api";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export function useRegister() {
  const { setUser, setToken } = useContext(AuthContext);

  const mutation = useApiMutation("register", null);

  const register = async (userData) => {
    const data = await mutation.mutateAsync({ ...userData, method: "POST" });
    const { user, token } = data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    setUser(user);
    setToken(token);
  };

  return { register, ...mutation };
}
