import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Category} from '../models/category';
import {CategoryService} from '../category.service';
import {NgForOf} from '@angular/common';
import {AdminCategoryListItemComponent} from './admin-category-list-item/admin-category-list-item.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'admin-category-list',
  imports: [
    RouterLink,
    NgForOf,
    AdminCategoryListItemComponent
  ],
  standalone: true,
  templateUrl: './admin-category-list.component.html'
})
export class AdminCategoryListComponent implements OnInit, OnDestroy {
  protected categories: Category[] = [];
  private subscription: Subscription = new Subscription();

  public constructor(private categoryService: CategoryService) {  }

  public ngOnInit(): void {
    this.trackChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private trackChanges(): void {
    this.subscription = this.categoryService.categories$
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }
}
