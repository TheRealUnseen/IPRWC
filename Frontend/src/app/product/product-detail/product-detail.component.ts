import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../models/product';
import {Category} from '../../category/models/category';
import {CurrencyPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {CartService} from '../../cart/cart.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'product-detail',
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    NgIf,
    RouterLink
  ],
  standalone: true,
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  public product: Product = new Product("", "", new Category("",""), 0, "", "");
  public amount: number = 1;

  constructor(private productService: ProductService, private cartService: CartService) {  }

  public ngOnInit(): void {
    this.product = this.productService.selectedProduct;
  }

  protected onAddToCart(): void {
    this.cartService.addToCart(this.product);
  }
}
