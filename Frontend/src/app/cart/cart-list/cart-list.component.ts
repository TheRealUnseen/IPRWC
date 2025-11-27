import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartItem} from '../models/cart-item';
import {CartListItemComponent} from './cart-list-item/cart-list-item.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'cart-list',
  imports: [
    CartListItemComponent,
    NgForOf
  ],
  standalone: true,
  templateUrl: './cart-list.component.html'
})
export class CartListComponent {
  @Output() public deleteAllItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() public deleteItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() public addItem: EventEmitter<number> = new EventEmitter<number>();
  @Input() public cartItems: CartItem[] = [];

  constructor() { }

  public onDeleteItemPress($event: number): void {
    this.deleteItem.emit($event);
  }

  public onDeleteAllItemPress($event: number): void {
    this.deleteAllItem.emit($event);
  }

  public onAddItemPress($event: number): void {
    this.addItem.emit($event);
  }
}
