import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject, catchError, map, Subject, throwError} from 'rxjs';
import {Category} from './models/category';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];
  public categories$: Subject<Category[]> = new BehaviorSubject<Category[]>([]);
  private _selectedCategory: Category = new Category("","");
  private readonly apiUrl: string = environment.apiUrl + '/categories';
  private readonly headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization': 'Bearer ' + window.sessionStorage.getItem("jwtToken")
  });

  constructor(private httpClient: HttpClient, private toastrService: ToastrService) {
    this.getAll();
  }

  private async getAll(): Promise<void> {
    const requestOptions = { headers: this.headers };
    const url = this.apiUrl;

    this.httpClient.get<{[key: string]: Category}>(url, requestOptions)
      .pipe(
        catchError((err : HttpErrorResponse) => {
          this.toastrService.error('Er is iets fout gegaan, probeer later opnieuw.', 'Kan geen categorieën verkrijgen');
          return throwError(() => new Error(err.message));
        }),
        map(responseData => {
          for (const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              this.categories.push(responseData[key]);
            }
          }
        })
      ).subscribe(() => {
      this.categories$.next(this.categories.slice());
    });
  }

  public create(category: Category) {
    const requestOptions = { headers: this.headers };
    const url = this.apiUrl + "/create";

    return this.httpClient.post<Category>(url, JSON.stringify(category), requestOptions)
      .pipe(
        catchError((err) => {
          this.toastrService.error('Er is iets fout gegaan, probeer later opnieuw.', 'Kan geen categorie opslaan');
          return throwError(() => err);
        })).subscribe((result: Category) => {
        this.categories.push(result);
        this.categories$.next(this.categories.slice());
        this.toastrService.success('Je categorie is aangemaakt.','Categorie aangemaakt');
      });
  }

  public update(category: Category) {
    const requestOptions = { headers: this.headers };
    const url = this.apiUrl + "/update";

    return this.httpClient.post<Category>(url, JSON.stringify(category), requestOptions)
      .pipe(
        catchError((err) => {
          this.toastrService.error('Er is iets fout gegaan, probeer later opnieuw.', 'Kan de categorie niet updaten');
          return throwError(() => err);
        })).subscribe((result: Category) => {
        this.categories = this.removeCategoryFromCategories(category, this.categories)
        this.categories.push(result);
        this.categories$.next(this.categories.slice());
        this.toastrService.success('Je categorie is geüpdatet.','Categorie geüpdatet');
      });
  }

  public delete(category: Category) {
    const requestOptions = { headers: this.headers };
    const url = this.apiUrl + "/" + category.id;

    return this.httpClient.delete(url, requestOptions)
      .pipe(
        catchError((err) => {
          this.toastrService.error('Er is iets fout gegaan, probeer later opnieuw.', 'Kan categorie niet verwijderen');
          return throwError(() => err);
        })).subscribe(() => {
        this.categories = this.removeCategoryFromCategories(category, this.categories)
        this.categories$.next(this.categories.slice());
        this.toastrService.success('Je categorie is verwijderd.','Categorie verwijderd');
      });
  }

  public get selectedCategory(): Category {
    return this._selectedCategory;
  }

  public set selectedCategory(category: Category) {
    this._selectedCategory = category;
  }

  private findInCategories(category: Category): number {
    return this.categories.findIndex(cat => cat.id === category.id)
  }

  private removeCategoryFromCategories(category: Category, categories: Category[]): Category[] {
    const index: number = this.findInCategories(category);

    if(index !== -1) {
      this.categories.splice(index,1);
    }

    return this.categories;
  }
}
