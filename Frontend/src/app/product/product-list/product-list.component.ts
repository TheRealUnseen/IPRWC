import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductListItemComponent} from './product-list-item/product-list-item.component';
import {Product} from '../models/product';
import {ProductService} from '../product.service';
import {NgForOf} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'product-list',
  imports: [
    ProductListItemComponent,
    NgForOf
  ],
  standalone: true,
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  private subscription: Subscription = new Subscription();

  public constructor(private productService: ProductService) {  }

  public ngOnInit(): void {
    this.trackChanges();
  }

  private trackChanges(): void {
    this.subscription = this.productService.products$
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
