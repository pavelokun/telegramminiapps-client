import { UserLoginResponse } from './auth/types';

export type UserPayload = UserLoginResponse & {
  key: string;
};
