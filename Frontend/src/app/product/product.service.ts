import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../category/models/category';
import {BehaviorSubject, catchError, map, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment.development';
import {Product} from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  public products$: Subject<Product[]> = new BehaviorSubject<Product[]>([]);
  private _selectedProduct: Product = new Product("", "", new Category("",""), 0, "", "");
  private readonly apiUrl: string = environment.apiUrl + '/products';
  private readonly headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization': 'Bearer ' + window.sessionStorage.getItem("jwtToken")
  });

  private readonly getAllHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  constructor(private httpClient: HttpClient, private toastrService: ToastrService) {
    this.getAll().then();
  }

  private async getAll(): Promise<void> {
    const requestOptions = { headers: this.getAllHeaders };
    const url = this.apiUrl;

    this.httpClient.get<{[key: string]: Product}>(url, requestOptions)
      .pipe(
        catchError((err : HttpErrorResponse) => {
          this.toastrService.error('Er is iets fout gegaan, probeer later opnieuw.', 'Kan geen producten verkrijgen');
          return throwError(() => new Error(err.message));
        }),
        map(responseData => {
          for (const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              this.products.push(responseData[key]);
            }
          }
        })
      ).subscribe(() => {
      this.products$.next(this.products.slice());
    });
  }

  public create(product: Product) {
    const requestOptions = { headers: this.headers };
    const url = this.apiUrl + "/create";

    return this.httpClient.post<Product>(url, JSON.stringify(product), requestOptions)
      .pipe(
        catchError((err) => {
          this.toastrService.error('Er is iets fout gegaan, probeer later opnieuw.', 'Kan geen product opslaan');
          return throwError(() => err);
        })).subscribe((result: Product) => {
        this.products.push(result);
        this.products$.next(this.products.slice());
        this.toastrService.success('Je product is aangemaakt.','Product aangemaakt');
      });
  }

  public update(product: Product) {
    const requestOptions = { headers: this.headers };
    const url = this.apiUrl + "/update";

    return this.httpClient.post<Product>(url, JSON.stringify(product), requestOptions)
      .pipe(
        catchError((err) => {
          this.toastrService.error('Er is iets fout gegaan, probeer later opnieuw.', 'Kan de product niet updaten');
          return throwError(() => err);
        })).subscribe((result: Product) => {
        this.products = this.removeProductFromProducts(product, this.products)
        this.products.push(result);
        this.products$.next(this.products.slice());
        this.toastrService.success('Je product is geüpdatet.','Product geüpdatet');
      });
  }

  public delete(product: Product) {
    const requestOptions = { headers: this.headers };
    const url = this.apiUrl + "/" + product.id;

    return this.httpClient.delete(url, requestOptions)
      .pipe(
        catchError((err) => {
          this.toastrService.error('Er is iets fout gegaan, probeer later opnieuw.', 'Kan product niet verwijderen');
          return throwError(() => err);
        })).subscribe(() => {
        this.products = this.removeProductFromProducts(product, this.products)
        this.products$.next(this.products.slice());
        this.toastrService.success('Je product is verwijderd.','Product verwijderd');
      });
  }

  public get selectedProduct(): Product {
    return this._selectedProduct;
  }

  public set selectedProduct(product: Product) {
    this._selectedProduct = product;
  }

  private findInProducts(product: Product): number {
    return this.products.findIndex(prod => prod.id === product.id)
  }

  private removeProductFromProducts(product: Product, products: Product[]): Product[] {
    const index: number = this.findInProducts(product);

    if(index !== -1) {
      this.products.splice(index,1);
    }

    return this.products;
  }
}
