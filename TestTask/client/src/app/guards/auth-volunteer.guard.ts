import { CanActivateFn } from '@angular/router';

export const authVolunteerGuard: CanActivateFn = (route, state) => {
  return true;
};
