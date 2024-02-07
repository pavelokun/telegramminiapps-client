import { useUserService } from '@artsiombarouski/rn-user-store-service';
import { UserPayload } from '@/src/api';

export function useUsers() {
  return useUserService<UserPayload>();
}
