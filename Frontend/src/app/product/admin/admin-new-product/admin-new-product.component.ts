import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {Category} from '../../../category/models/category';
import {Product} from '../../models/product';
import {ProductService} from '../../product.service';
import {CategoryService} from '../../../category/category.service';

@Component({
  selector: 'admin-new-product',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    RouterLink
  ],
  standalone: true,
  templateUrl: './admin-new-product.component.html'
})
export class AdminNewProductComponent implements OnInit {
  protected categories: Category[] = [];
  private product: Product = new Product("","",new Category("",""),0, "", "");
  protected newProductForm: FormGroup = new FormGroup({});

  public constructor(private router: Router, private productService: ProductService, private categoryService: CategoryService) {
    this.categoryService.categories$
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  public ngOnInit(): void {
    this.product = this.productService.selectedProduct;
    this.newProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl(''),
      imageName: new FormControl('', Validators.required),
    });
  }

  async onSubmit() {
    let category: Category = this.categories.find(cat => cat.id === this.newProductForm.get('category')!.value)!;
    let product: Product = new Product(
      this.product.id,
      this.newProductForm.get('name')!.value,
      category,
      this.newProductForm.get('price')!.value,
      this.newProductForm.get('description')!.value,
      this.newProductForm.get('imageName')!.value
    );
    this.productService.create(product);

    await this.router.navigate(["/admin/manage-products"]);
  }
}
