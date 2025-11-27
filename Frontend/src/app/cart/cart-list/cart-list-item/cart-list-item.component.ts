import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartItem} from '../../models/cart-item';
import {Product} from '../../../product/models/product';
import {Category} from '../../../category/models/category';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'cart-list-item',
  imports: [
    CurrencyPipe,
    NgOptimizedImage
  ],
  standalone: true,
  templateUrl: './cart-list-item.component.html'
})
export class CartListItemComponent {
  @Output() public deleteItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() public deleteAllItem: EventEmitter<number> = new EventEmitter<number>();
  @Output() public addItem: EventEmitter<number> = new EventEmitter<number>();
  @Input() public index: number = 0;
  @Input() public cartItem: CartItem = new CartItem(new Product("", "", new Category("", ""), 0, "", ""),0);

  constructor() { }

  public onDeleteItemPress(): void {
    this.deleteItem.emit(this.index);
  }

  public onDeleteAllItemPress(): void {
    this.deleteAllItem.emit(this.index);
  }

  public onAddItemPress(): void {
    this.addItem.emit(this.index);
  }
}
