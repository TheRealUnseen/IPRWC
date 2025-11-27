import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AccountService} from '../../account.service';


export const authenticationGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (accountService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']).then();
    return false;
  }
};
