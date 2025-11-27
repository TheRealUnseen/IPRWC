import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderListItemComponent} from './order-list-item/order-list-item.component';
import {Order} from '../models/order';
import {NgForOf} from '@angular/common';
import {OrderService} from '../order.service';
import {RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'order-list',
  imports: [
    OrderListItemComponent,
    NgForOf,
    RouterLink
  ],
  standalone: true,
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit, OnDestroy {
  protected orders: Order[] = [];
  private subscription: Subscription = new Subscription();

  public constructor(private orderService: OrderService) {  }

  async ngOnInit(): Promise<void> {
    this.subscription = this.orderService.orders$
      .subscribe((orders) => {
        this.orders = orders;
      });

    await this.orderService.getAll()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
