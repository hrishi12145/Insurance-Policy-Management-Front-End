import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// *******Importing User Component  *********************************
import { IndexTemplateComponent } from './components/template/index-template/index-template.component';
import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { DetailComponent } from './components/user/detail/detail.component';
import { AboutUsComponent } from './components/user/about-us/about-us.component';
import { ContactUsComponent } from './components/user/contact-us/contact-us.component';
import { OrderComponent } from './components/user/order/order.component';
import {TransactionDetailsComponent} from './components/user/transaction-details/transaction-details.component';
// ******* Importing Admin Component  *********************************
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { PolicyListComponent } from './components/admin/policy-list/policy-list.component';
import { AdminListComponent } from './components/admin/admin-list/admin-list.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { TransactionListComponent } from './components/admin/transaction-list/transaction-list.component';
// ******* Error Component  *********************************
import { NotFoundComponent } from './components/error/not-found/not-found.component';
const routes: Routes = [
  // User Panel
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexTemplateComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search/:keyword', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'buy', component: OrderComponent },
  { path: 'transaction-details', component: TransactionDetailsComponent },
  // admin Panel
  { path: 'admin-register', component: AdminRegisterComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-profile', component: AdminProfileComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-search/:keyword', component: UserListComponent },
  { path: 'policy-list', component: PolicyListComponent },
  { path: 'admin-list', component: AdminListComponent },
  { path: 'admin-search/:keyword', component: AdminListComponent },
  { path: 'transaction-list', component: TransactionListComponent },
  { path: 'transaction-search/:keyword', component: TransactionListComponent },
  // error pages
  { path: '404', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
