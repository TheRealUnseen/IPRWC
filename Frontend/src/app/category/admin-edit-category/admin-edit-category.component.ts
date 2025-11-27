import {Component, OnInit} from '@angular/core';
import {Category} from '../models/category';
import {CategoryService} from '../category.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'edit-category',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  standalone: true,
  templateUrl: './admin-edit-category.component.html'
})
export class AdminEditCategoryComponent implements OnInit {
  private category: Category = new Category("","");
  protected editCategoryForm: FormGroup = new FormGroup({});

  public constructor(private router: Router, private categoryService: CategoryService) { }

  public ngOnInit(): void {
    this.category = this.categoryService.selectedCategory;
    this.editCategoryForm = new FormGroup({
      id: new FormControl({value: this.category.id, disabled: true}),
      name: new FormControl(this.category.name, Validators.required),
    });
  }

  async onSubmit() {
    if(this.category.name !== this.editCategoryForm.get('name')!.value) {
      let category: Category = new Category(this.category.id,this.editCategoryForm.get('name')!.value);
      this.categoryService.update(category);
    }

    await this.router.navigate(["/admin/manage-categories"]);
  }
}
