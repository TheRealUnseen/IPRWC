import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AdminProductListItemComponent} from './admin-product-list-item/admin-product-list-item.component';
import {Product} from '../../models/product';
import {ProductService} from '../../product.service';
import {CategoryService} from '../../../category/category.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'admin-product-list',
  imports: [
    AdminProductListItemComponent,
    NgForOf,
    RouterLink
  ],
  standalone: true,
  templateUrl: './admin-product-list.component.html'
})
export class AdminProductListComponent implements OnInit, OnDestroy {
  protected products: Product[] = [];
  private subscription: Subscription = new Subscription();

  public constructor(private productService: ProductService, private categoryService: CategoryService) {  }

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
