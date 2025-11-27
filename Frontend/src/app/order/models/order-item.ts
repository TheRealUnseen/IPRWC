import {Category} from '../../category/models/category';
import {Product} from '../../product/models/product';
import {Order} from './order';
import {OrderStatus} from './order-status';

export class OrderItem {
  private _id: string = "";
  private _order: Order = new Order("",[], new Date(), 0, OrderStatus.Pending);
  private _product: Product = new Product("","",new Category("",""), 0, "", "");
  private _quantity: number = 0;
  private _price: number = 0;

  public constructor(id: string, order: Order, product: Product, quantity: number, price: number) {
    this._id = id;
    this._order = order;
    this._product = product;
    this._quantity = quantity;
    this._price = price;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get order(): Order {
    return this._order;
  }

  set order(value: Order) {
    this._order = value;
  }

  get product(): Product {
    return this._product;
  }

  set product(value: Product) {
    this._product = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  public toJSON(): any {
    return {
      productId: this._product.id,
      quantity: this._quantity,
      price: this._price
    };
  }
}
