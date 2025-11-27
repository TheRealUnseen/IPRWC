import {Component, Input} from '@angular/core';
import {Order} from '../../models/order';
import {OrderStatus} from '../../models/order-status';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'order-list-item',
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  standalone: true,
  templateUrl: './order-list-item.component.html'
})
export class OrderListItemComponent {
  @Input() order: Order = new Order("",[], new Date(), 0, OrderStatus.Pending);

  public constructor(private router: Router) { }

  protected async openDetails(): Promise<void> {
    await this.router.navigate(['/account/order/' + this.order.id + '/']);
  }
}
