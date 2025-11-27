import {Component, Input} from '@angular/core';
import {Category} from '../../models/category';
import {Router} from '@angular/router';
import {CategoryService} from '../../category.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'admin-category-list-item',
  imports: [
    NgClass
  ],
  standalone: true,
  templateUrl: './admin-category-list-item.component.html'
})
export class AdminCategoryListItemComponent {
  @Input() public category!: Category;
  @Input() public index!: number;

  public constructor(private router: Router, private categoryService: CategoryService) {  }

  async setSelected(): Promise<void> {
    this.categoryService.selectedCategory = this.category;
    await this.router.navigate(["/admin/manage-categories/edit"]);
  }

  delete(): void {
    this.categoryService.delete(this.category);
  }
}
