import { useUsers } from './useUsers';
import { UserLimiter } from '@/src/services/UserLimiter';
import { UserDto } from '@/src/api/users/types';

function enhanceUserWithLimiter(user: UserDto): UserDto {
  return {
    ...user,
    limiter: new UserLimiter(user),
  };
}

export function useUserInfo() {
  const user = useUsers().currentUser?.user;

  if (!user) {
    return null;
  }
  // Enhance the user with the UserLimiter
  return enhanceUserWithLimiter(user);
}
