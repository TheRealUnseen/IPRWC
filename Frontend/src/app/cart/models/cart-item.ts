import {Product} from '../../product/models/product';
import {Category} from '../../category/models/category';

export class CartItem {
  private _product: Product = new Product("", "", new Category("", ""), 0, "", "");
  private _amount: number = 0;

  constructor(product: Product, amount: number) {
    this._product = product;
    this._amount = amount;
  }

  get product(): Product {
    return this._product;
  }

  set product(value: Product) {
    this._product = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }
}
