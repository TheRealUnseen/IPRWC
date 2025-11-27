import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {CartService} from '../cart/cart.service';
import {AccountService} from '../account/account.service';
import {Category} from '../category/models/category';
import {Subscription} from 'rxjs';

@Component({
  selector: 'custom-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    NgIf
  ],
  standalone: true,
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected isDropdownVisible: boolean = false;
  protected cartTotalItemsAmount: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(protected cartService: CartService, protected accountService: AccountService) {  }

  public ngOnInit(): void {
    this.trackChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private trackChanges(): void {
    this.subscription = this.cartService.cart$
      .subscribe((cart) => {
        this.cartTotalItemsAmount = cart.totalItemsAmount;
      });
  }

  protected toggleDropdown(show: boolean): void {
    this.isDropdownVisible = show;
  }
}
