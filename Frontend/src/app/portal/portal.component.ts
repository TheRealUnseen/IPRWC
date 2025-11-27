import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../account/account.service';
import {AdminPortalComponent} from './admin-portal/admin-portal.component';
import {CustomerPortalComponent} from './customer-portal/customer-portal.component';
import {NgIf} from '@angular/common';
import {AccountType} from '../account/models/account-type';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'portal',
  imports: [
    AdminPortalComponent,
    CustomerPortalComponent,
    NgIf
  ],
  standalone: true,
  templateUrl: './portal.component.html'
})
export class PortalComponent implements OnInit, OnDestroy {
  protected accountType: number = -1;
  private subscription: Subscription = new Subscription();

  constructor(private accountService: AccountService, private router: Router) {
  }

  public async ngOnInit(): Promise<void> {
    await this.accountService.getAccountType();
    this.trackChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private trackChanges(): void {
    this.subscription = this.accountService.accountType$
      .subscribe((accountType: string) => {
        this.accountType = parseInt(accountType);

        if (AccountType[this.accountType] !== 'Admin' && AccountType[this.accountType] !== 'Customer') {
          this.router.navigate(['/login']).then();
        }
      });
  }

  protected readonly AccountType = AccountType;
}
