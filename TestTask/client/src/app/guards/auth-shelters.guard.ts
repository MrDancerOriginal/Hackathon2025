import { CanActivateFn } from '@angular/router';

export const authSheltersGuard: CanActivateFn = (route, state) => {
  return true;
};
