import {OrderItem} from './order-item';
import {OrderStatus} from './order-status';

export class Order {
  private _id: string = "";
  private _orderItems: OrderItem[] = [];
  private _orderDate: Date = new Date();
  private _totalPrice: number = 0;
  private _status: OrderStatus = OrderStatus.Pending;

  public constructor(id: string, orderItems: OrderItem[], orderDate: Date, totalPrice: number, status: OrderStatus) {
    this._id = id;
    this._orderItems = orderItems;
    this._orderDate = orderDate;
    this._totalPrice = totalPrice;
    this._status = status;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get orderItems(): OrderItem[] {
    return this._orderItems;
  }

  set orderItems(value: OrderItem[]) {
    this._orderItems = value;
  }

  get orderDate(): Date {
    return this._orderDate;
  }

  set orderDate(value: Date) {
    this._orderDate = value;
  }

  get totalPrice(): number {
    return this._totalPrice;
  }

  set totalPrice(value: number) {
    this._totalPrice = value;
  }

  get status(): OrderStatus {
    return this._status;
  }

  set status(value: OrderStatus) {
    this._status = value;
  }

  public toJSON(): any {
    return {
      orderItems: this._orderItems.map(item => item.toJSON()),
      orderDate: this._orderDate.toISOString(),
      totalPrice: this._totalPrice,
      status: OrderStatus[this._status]
    };
  }
}
