// hooks/useFollowing.js
import { useUserConnections } from "./useUserConnections";

export function useFollowing(userId, initialPage = 1) {
  return useUserConnections("following", userId, initialPage);
}
