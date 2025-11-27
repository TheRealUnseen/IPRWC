import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../product.service';
import {Category} from '../../../category/models/category';
import {CartService} from '../../../cart/cart.service';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'product-list-item',
  imports: [
    CurrencyPipe,
    RouterLink,
    NgOptimizedImage
  ],
  standalone: true,
  templateUrl: './product-list-item.component.html'
})
export class ProductListItemComponent {
  @Input() public index: number = 0;
  @Input() public product: Product = new Product("","",new Category("",""),0,"", "");

  constructor(private productService: ProductService , private cartService: CartService) {  }

  public onAddToCart(): void {
    this.cartService.addToCart(this.product);
  }

  public onDetails(): void {
    this.productService.selectedProduct = this.product;
  }
}
