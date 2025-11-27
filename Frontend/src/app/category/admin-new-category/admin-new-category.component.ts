import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from '../models/category';
import {Router, RouterLink} from '@angular/router';
import {CategoryService} from '../category.service';

@Component({
  selector: 'admin-new-category',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  standalone: true,
  templateUrl: './admin-new-category.component.html'
})
export class AdminNewCategoryComponent implements OnInit {
  newCategoryForm: FormGroup = new FormGroup({});

  public constructor(private router: Router, private categoryService: CategoryService) { }

  public ngOnInit(): void {
    this.newCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  async onSubmit() {
    let category: Category = new Category("",this.newCategoryForm.get('name')!.value);
    this.categoryService.create(category);

    await this.router.navigate(["/admin/manage-categories"]);
  }
}
