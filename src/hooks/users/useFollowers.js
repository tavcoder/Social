// hooks/useFollowers.js
import { useUserConnections } from "@/hooks/users";

export function useFollowers(userId, initialPage = 1) {
  return useUserConnections("followers", userId, initialPage);
}
