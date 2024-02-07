import { UserDto } from '@/src/api/users/types';
// import { MediaModel } from '@/src/api/media';
import { isNothing } from '@artsiombarouski/rn-resources';

//todo: end limiter logic
export class UserLimiter {
  constructor(readonly user: UserDto) {}

  // canWatchMedia(model: MediaModel): boolean {
  //   if (this.isMediaAvailable(model.id)) {
  //     return true;
  //   }
  //   //     if (
  //   //   (user?.purchases && hasAccess(user?.purchases, model.id)) ||
  //   //   controller.hasAccessToMedia
  //   // ) {
  //   return false;
  // }

  isMediaAvailable(mediaId?: string) {
    if (isNothing(this.user.purchases) || isNothing(mediaId)) return false;
    // Loop through the user's entitlements
    for (const purchase of this.user.purchases) {
      // Check if the entitlement's products include the desired productId
      if (purchase.mediaId === mediaId) {
        return true; // User has access to the product
      }
    }
    return false; // User does not have access to the product
  }
}
