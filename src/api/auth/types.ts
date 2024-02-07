import { UserDto } from '../users/types';

export type UserLoginResponse = {
  authToken: string;
  user: UserDto;
};
