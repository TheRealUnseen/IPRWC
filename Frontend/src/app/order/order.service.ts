import {Injectable} from '@angular/core';
import {CartItem} from '../cart/models/cart-item';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Order} from './models/order';
import {BehaviorSubject, catchError, map, Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment.development';
import {OrderItem} from './models/order-item';
import {OrderStatus} from './models/order-status';
import {Router} from '@angular/router';
import {CartService} from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  public orders$: Subject<Order[]> = new BehaviorSubject<Order[]>([]);
  private readonly FREE_DELIVERY_THRESHOLD: number = 50;
  private readonly DELIVERY_PRICE: number = 7.95;
  private readonly apiUrl: string = environment.apiUrl + '/orders';
  private readonly headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization': 'Bearer ' + window.sessionStorage.getItem("jwtToken")
  });

  constructor(private httpClient: HttpClient, private toastrService: ToastrService, private router: Router, private cartService: CartService) {
  }

  public async placeOrder(cartItems: CartItem[]): Promise<void> {
    if (cartItems.length > 0) {
      let order: Order = this.convertCartItemArrayToOrder(cartItems);
      this.create(order);
      await this.router.navigate(['/account/orders']);
    }
  }

  public async getAll(): Promise<void> {
    const requestOptions = { headers: this.headers };
    const url = this.apiUrl;

    this.httpClient.get<{[key: string]: Order}>(url, requestOptions)
      .pipe(
        catchError((err : HttpErrorResponse) => {
          this.toastrService.error('Er is iets fout gegaan, probeer later opnieuw.', 'Kan je bestellingen niet ophalen');
          return throwError(() => new Error(err.message));
        }),
        map(responseData => {
          this.orders = [];
          for (const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              this.orders.push(responseData[key]);
            }
          }
        })
      ).subscribe(() => {
      this.orders$.next(this.orders.slice());
    });
  }

  private create(order: Order) {
    const requestOptions = { headers: this.headers };
    const url = this.apiUrl + "/create";

    return this.httpClient.post<Order>(url, JSON.stringify(order), requestOptions)
      .pipe(
        catchError((err) => {
          this.toastrService.error('Er is iets fout gegaan, probeer later opnieuw.', 'Je bestelling is mislukt');
          return throwError(() => err);
        })).subscribe((result: Order) => {
        this.orders.push(result);
        this.orders$.next(this.orders.slice());
        this.cartService.deleteCart();
        this.toastrService.success('Je bestelling is geplaatst.','Bestelling geplaatst');
      });
  }

  public getOrderById(id: string): Order {
    return this.orders.find(order => order.id === id)!;
  }

  private convertCartItemArrayToOrder(items: CartItem[]): Order {
    let order: Order = new Order("", [], new Date(), 0, OrderStatus.Pending);

    for (const item of items) {
      order.totalPrice += item.amount * item.product.price;
      order.orderItems.push(this.convertCartItemIntoOrderItem(item, order));
    }

    if(order.totalPrice < this.FREE_DELIVERY_THRESHOLD) {
      order.totalPrice += this.DELIVERY_PRICE;
    }

    return order;
  }

  private convertCartItemIntoOrderItem(item: CartItem, order: Order): OrderItem {
    return new OrderItem("", order, item.product, item.amount, item.product.price);
  }
}
