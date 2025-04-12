import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AuthService);
  const toastr = inject(ToastrService);

  if(!accountService.isLoggedIn){
    toastr.warning('Ви повинні увійти, щоб отримати доступ до цієї сторінки.');
    return false;
  }

  return true;
};
