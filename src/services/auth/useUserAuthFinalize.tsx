import { ResourceApiResponse } from '@artsiombarouski/rn-resources';
import { useAlert } from '@artsiombarouski/rn-components';
import { useRouter } from 'expo-router';
import { useUsers } from '@/src/services/hooks/useUsers';
import { UserAuthResultDto } from '@/src/services/auth/UserAuthController';

export function useUserAuthFinalize(shouldResetNavigation: boolean = true) {
  const alert = useAlert();
  const users = useUsers();
  const router = useRouter();

  return async (result: ResourceApiResponse<UserAuthResultDto> | undefined) => {
    if (!result || result.error) {
      alert.showError({
        title:
          result?.error?.message?.toString() ??
          result?.error?.title ??
          'Oops, something went wrong',
      });
      return result;
    }

    await users.addUser({
      ...result.data!,
      key: result.data!.user!.id,
    });

    if (shouldResetNavigation) {
      router.replace('/');
    }
    return result;
  };
}
