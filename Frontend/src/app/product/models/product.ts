import {Category} from '../../category/models/category';

export class Product {
  private _id: string = "";
  private _name: string = "";
  private _category: Category = new Category("","");
  private _price: number = 0;
  private _description: string = "";
  private _imageName: string = "";

  public constructor(id: string, name: string, category: Category, price: number, description: string, imageName: string) {
    this._id = id;
    this._name = name;
    this._category = category;
    this._price = price;
    this._description = description;
    this._imageName = imageName;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get category(): Category {
    return this._category;
  }

  public set category(category: Category)  {
    this._category = category;
  }

  public get price(): number {
    return this._price;
  }

  public set price(price: number) {
    this._price = price;
  }

  public get description(): string {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get imageName(): string {
    return this._imageName;
  }

  public set imageName(value: string) {
    this._imageName = value;
  }

  public toJSON(): any {
    return {
      id: this._id,
      name: this._name,
      category: this._category instanceof Category ? this._category.toJSON() : this._category,
      price: this._price,
      description: this._description,
      imageName: this._imageName
    };
  }
}
