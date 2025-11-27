import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {inject} from '@angular/core';
import {AccountService} from '../../account.service';
import {AccountType} from '../../models/account-type';

export const accountTypeGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const accountService: AccountService = inject(AccountService);
  return new Observable<boolean>((observer) => {
    accountService.accountType$.subscribe((accountType: string) => {
      if (parseInt(accountType) === AccountType.Admin) {
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });

    accountService.getAccountType().then();
  });
};
