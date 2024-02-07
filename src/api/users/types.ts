import { UserLimiter } from '@/src/services/UserLimiter';

export type PurchaseDto = {
  id: string;
  userId: string;
  purchaseDate: Date;
  courseId?: string;
  mediaId?: string;
};

export type UserDto = {
  id: string;
  telegramId: number;
  firstName: string;
  lastName: string;
  userName: string;
  purchases: PurchaseDto[];
  limiter: UserLimiter;
};
