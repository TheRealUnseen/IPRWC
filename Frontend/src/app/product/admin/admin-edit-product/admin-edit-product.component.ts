import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {Category} from '../../../category/models/category';
import {Product} from '../../models/product';
import {Router, RouterLink} from '@angular/router';
import {ProductService} from '../../product.service';
import {CategoryService} from '../../../category/category.service';


@Component({
  selector: 'admin-edit-product',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    RouterLink
  ],
  standalone: true,
  templateUrl: './admin-edit-product.component.html'
})
export class AdminEditProductComponent implements OnInit {
  protected categories: Category[] = [];
  private product: Product = new Product("","",new Category("",""),0, "", "");
  protected editProductForm: FormGroup = new FormGroup({});

  public constructor(private router: Router, private productService: ProductService, private categoryService: CategoryService) {
    this.categoryService.categories$
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  public ngOnInit(): void {
    this.product = this.productService.selectedProduct;
    this.editProductForm = new FormGroup({
      id: new FormControl({value: this.product.id, disabled: true}),
      name: new FormControl(this.product.name, Validators.required),
      category: new FormControl(this.product.category.id, Validators.required),
      price: new FormControl(this.product.price, Validators.required),
      description: new FormControl(this.product.description),
      imageName: new FormControl(this.product.imageName, Validators.required),
    });
  }

  async onSubmit() {
    if(this.product.name !== this.editProductForm.get('name')!.value ||
      this.product.category !== this.editProductForm.get('category')!.value ||
      this.product.price !== this.editProductForm.get('price')!.value ||
      this.product.description !== this.editProductForm.get('description')!.value ||
      this.product.imageName !== this.editProductForm.get('imageName')!.value
    ) {
      let product: Product = new Product(this.product.id,
        this.editProductForm.get('name')!.value,
        this.categories.find(cat => cat.id === this.editProductForm.get('category')!.value)!,
        this.editProductForm.get('price')!.value,
        this.editProductForm.get('description')!.value,
        this.editProductForm.get('imageName')!.value
      );
      this.productService.update(product);
    }

    await this.router.navigate(["/admin/manage-products"]);
  }
}
