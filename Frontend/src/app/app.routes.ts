import { Routes } from '@angular/router';
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import {PrivacyComponent} from './footer/privacy/privacy.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {PortalComponent} from './portal/portal.component';
import {CustomerPortalComponent} from './portal/customer-portal/customer-portal.component';
import {AdminPortalComponent} from './portal/admin-portal/admin-portal.component';
import {AdminCategoryListComponent} from './category/admin-category-list/admin-category-list.component';
import {HomeComponent} from './home/home.component';
import {AdminNewCategoryComponent} from './category/admin-new-category/admin-new-category.component';
import {AdminEditCategoryComponent} from './category/admin-edit-category/admin-edit-category.component';
import {CartComponent} from './cart/cart.component';
import {AdminProductListComponent} from './product/admin/admin-product-list/admin-product-list.component';
import {AdminNewProductComponent} from './product/admin/admin-new-product/admin-new-product.component';
import {AdminEditProductComponent} from './product/admin/admin-edit-product/admin-edit-product.component';
import {OrderListComponent} from './order/order-list/order-list.component';
import {OrderDetailComponent} from './order/order-detail/order-detail.component';
import {authenticationGuard} from './account/guards/authentication/authentication.guard';
import {accountTypeGuard} from './account/guards/accountType/accountType.guard';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';


export const routes: Routes = [
  //Home
  {path: "", component: HomeComponent},
  //Account
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  //Footer
  {path: "privacy", component: PrivacyComponent},
  //Product
  {path: "product/:id", component: ProductDetailComponent},
  {path: "products", component: ProductListComponent},
  //Portal
  {path: "account", component: PortalComponent, canActivate: [authenticationGuard]},
  {path: "customer", component: CustomerPortalComponent, canActivate: [authenticationGuard]},
  {path: "admin", component: AdminPortalComponent, canActivate: [authenticationGuard, accountTypeGuard]},
  //Admin products
  {path: "admin/manage-products", component: AdminProductListComponent, canActivate: [authenticationGuard, accountTypeGuard]},
  {path: "admin/manage-products/new", component: AdminNewProductComponent, canActivate: [authenticationGuard, accountTypeGuard]},
  {path: "admin/manage-products/edit", component: AdminEditProductComponent, canActivate: [authenticationGuard, accountTypeGuard]},
  //Admin categories
  {path: "admin/manage-categories", component: AdminCategoryListComponent, canActivate: [authenticationGuard, accountTypeGuard]},
  {path: "admin/manage-categories/new", component: AdminNewCategoryComponent, canActivate: [authenticationGuard, accountTypeGuard]},
  {path: "admin/manage-categories/edit", component: AdminEditCategoryComponent, canActivate: [authenticationGuard, accountTypeGuard]},
  //Cart
  {path: "cart", component: CartComponent},
  //Order
  {path: "account/order/:id", component: OrderDetailComponent, canActivate: [authenticationGuard]},
  {path: "account/orders", component: OrderListComponent, canActivate: [authenticationGuard]},
];
