import {Component, OnInit} from '@angular/core';
import {Order} from '../models/order';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {OrderService} from '../order.service';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {OrderStatus} from '../models/order-status';

@Component({
  selector: 'order-detail',
  imports: [
    DatePipe,
    CurrencyPipe,
    NgIf,
    NgForOf,
    RouterLink
  ],
  standalone: true,
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  protected order: Order = new Order("", [], new Date, 0, OrderStatus.Pending);
  private orderId: string = '';

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    this.order = this.orderService.getOrderById(this.orderId);

    if(this.order === undefined) {
      this.order = new Order("", [], new Date, 0, OrderStatus.Pending);
    }
  }
}
