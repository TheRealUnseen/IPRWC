import { Injectable } from '@angular/core';
import {CartItem} from './models/cart-item';
import {BehaviorSubject, Subject} from 'rxjs';
import {Product} from '../product/models/product';
import {Cart} from './models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart([]);
  public cart$: Subject<Cart> = new BehaviorSubject<Cart>(this.cart);

  constructor() {
    let data = window.sessionStorage.getItem('cart') || undefined;
    if(data != undefined) {
      this.cart.loadCartFromSessionStorage(JSON.parse(data));
      this.cart$.next(this.cart);
    }
  }

  public addToCart(product: Product): void{
    this.cart.addToCart(product);
    this.cart$.next(this.cart);
  }

  public addToCartWhenExist(index: number): void {
    this.cart.addToCartWhenExist(index);
    this.cart$.next(this.cart);
  }

  public deleteFromCart(index: number): void {
    this.cart.deleteFromCart(index);
    this.cart$.next(this.cart);
  }

  public deleteAllFromCart(index: number): void {
    this.cart.deleteAllFromCart(index);
    this.cart$.next(this.cart);
  }

  public deleteCart(): void {
    this.cart = new Cart([]);
    this.cart$.next(this.cart);
    window.sessionStorage.removeItem('cart');
  }
}
