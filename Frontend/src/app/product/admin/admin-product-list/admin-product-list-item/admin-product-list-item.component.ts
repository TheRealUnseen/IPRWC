import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {CurrencyPipe, NgClass} from '@angular/common';
import {Product} from '../../../models/product';
import {ProductService} from '../../../product.service';

@Component({
  selector: 'admin-product-list-item',
  imports: [
    CurrencyPipe,
    NgClass
  ],
  standalone: true,
  templateUrl: './admin-product-list-item.component.html'
})
export class AdminProductListItemComponent {
  @Input() public product!: Product;
  @Input() public index!: number;

  public constructor(private router: Router, private productsService: ProductService) {  }

  async setSelected(): Promise<void> {
    this.productsService.selectedProduct = this.product;
    await this.router.navigate(['/admin/manage-products/edit']);
  }

  delete(): void {
    this.productsService.delete(this.product);
  }
}
