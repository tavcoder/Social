// hooks/useFollowing.js
import { useUserConnections } from "@/hooks/users";

export function useFollowing(userId, initialPage = 1) {
  return useUserConnections("following", userId, initialPage);
}
