import { useApiMutation } from "@/api";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export function useLogin() {
  const { setUser, setToken } = useContext(AuthContext);

  const mutation = useApiMutation("login", null);

  const login = async (credentials) => {
    const data = await mutation.mutateAsync({ ...credentials, method: "POST" });
    const { user, token } = data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    setUser(user);
    setToken(token);
  };

  return { login, ...mutation };
}
