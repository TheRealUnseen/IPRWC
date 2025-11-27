import {CartItem} from './cart-item';
import {Product} from '../../product/models/product';

export class Cart {
  private readonly _cartItems: CartItem[] = [];
  private _totalItemsAmount: number = 0;

  constructor(cartItems: CartItem[]) {
    this._cartItems = cartItems;
  }

  public loadCartFromSessionStorage(temp: any[]) {
    for (let i = 0; i < temp.length; i++) {
      let cartItem: CartItem = new CartItem(temp[i]._product, temp[i]._amount);
      this.addItem(cartItem);
    }
  }

  public addItem(item: CartItem) {
    this._cartItems.push(item);
    this._totalItemsAmount += item.amount;
  }

  public addToCart(product: Product): void{
    for (let i = 0; i < this._cartItems.length; i++) {
      if(this._cartItems[i].product.id == product.id) {
        this.addToCartWhenExist(i);
        return;
      }
    }

    let cartItem = new CartItem(product, 1);
    this._cartItems.push(cartItem);
    this._totalItemsAmount += 1;
    this.saveCartToSessionStorage();
  }

  public addToCartWhenExist(index: number) {
    this._cartItems[index].amount += 1;
    this._totalItemsAmount += 1;
    this.saveCartToSessionStorage();
  }

  public deleteFromCart(index: number): void{
    this._cartItems[index].amount -= 1;
    this._totalItemsAmount -= 1;

    if(this._cartItems[index].amount == 0) {
      this.deleteAllFromCart(index);
    }
    this.saveCartToSessionStorage();
  }

  public deleteAllFromCart(index: number): void{
    if(index > -1){
      this._totalItemsAmount -= this._cartItems[index].amount;
      this._cartItems.splice(index, 1);
    }
    this.saveCartToSessionStorage();
  }

  public get cartItems(): CartItem[] {
    return this._cartItems;
  }

  public get totalItemsAmount() {
    return this._totalItemsAmount;
  }

  private saveCartToSessionStorage(): void {
    window.sessionStorage.setItem('cart', JSON.stringify(this._cartItems));
  }
}
