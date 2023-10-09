import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { ProductsComponent } from './components/products/products.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { authenticationGuard } from './authentication.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [authenticationGuard],
    component: HomeComponent,
  },
  {
    path: 'products',
    canActivate: [authenticationGuard],
    component: ProductsComponent,
  },
  {
    path: 'productdetails/:id',
    canActivate: [authenticationGuard],
    component: ProductdetailsComponent,
  },
  {
    path: 'cart',
    canActivate: [authenticationGuard],
    component: CartComponent,
  },
  {
    path: 'wishlist',
    canActivate: [authenticationGuard],
    component: WishlistComponent,
  },
  {
    path: 'categories',
    canActivate: [authenticationGuard],
    component: CategoriesComponent,
  },
  {
    path: 'brands',
    canActivate: [authenticationGuard],
    component: BrandsComponent,
  },
  {
    path: 'allorders',
    canActivate: [authenticationGuard],
    component: AllordersComponent,
  },
  {
    path: 'checkout',
    canActivate: [authenticationGuard],
    component: CheckoutComponent,
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'forgotpassword',
    loadComponent: () =>
      import('../app/components/forgotpassword/forgotpassword.component').then(
        (c) => c.ForgotpasswordComponent
      ),
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
