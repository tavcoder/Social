// hooks/useFollowers.js
import { useUserConnections } from "./useUserConnections";

export function useFollowers(userId, initialPage = 1) {
  return useUserConnections("followers", userId, initialPage);
}
