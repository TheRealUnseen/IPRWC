import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from './models/cart-item';
import {CartService} from './cart.service';
import {CurrencyPipe, NgIf} from '@angular/common';
import {OrderService} from '../order/order.service';
import {CartListComponent} from './cart-list/cart-list.component';
import {AccountService} from '../account/account.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'cart',
  imports: [
    NgIf,
    CartListComponent,
    CurrencyPipe
  ],
  standalone: true,
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit, OnDestroy {
  public cartItems: CartItem[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private cartService: CartService, private orderService: OrderService, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.cartService.cart$
      .subscribe((cart) => {
          this.cartItems = cart.cartItems;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public get totalPriceExcl(): number{
    let totalPrice = 0;
    this.cartItems.forEach((cartItem: CartItem) => {
      totalPrice += (cartItem.product.price * cartItem.amount);
    });

    return totalPrice;
  }

  public get totalPriceIncl(): number {
    let totalPrice = 0;
    this.cartItems.forEach((cartItem: CartItem) => {
      totalPrice += (cartItem.product.price * cartItem.amount);
    });

    if(totalPrice < 50 && totalPrice != 0) {
      totalPrice += 7.95;
    }

    return totalPrice;
  }

  public deleteItem($event: number): void {
    this.cartService.deleteFromCart($event);
  }

  public deleteAllItem($event: number): void {
    this.cartService.deleteAllFromCart($event);
  }

  public addItem($event: number): void {
    this.cartService.addToCartWhenExist($event);
  }

  async order(): Promise<void> {
    if(this.accountService.isLoggedIn()) {
      await this.orderService.placeOrder(this.cartItems);
    } else {
      await this.router.navigate(['/login']);
    }
  }
}
