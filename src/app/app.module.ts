import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// *************** import All Components   ******************************
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { HomeComponent } from './components/user/home/home.component';
import { DetailComponent } from './components/user/detail/detail.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { AdminListComponent } from './components/admin/admin-list/admin-list.component';
import { PolicyListComponent } from './components/admin/policy-list/policy-list.component';
import { TransactionListComponent } from './components/admin/transaction-list/transaction-list.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { IndexTemplateComponent } from './components/template/index-template/index-template.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { AboutUsComponent } from './components/user/about-us/about-us.component';
import { ContactUsComponent } from './components/user/contact-us/contact-us.component';
import { OrderComponent } from './components/user/order/order.component';
import { SearchComponent } from './components/user/search/search.component';
// ***************HttpClientModule and FormsModule, ReactiveFormsModule Modules ***************
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// IMPORT ALL MATERIAL COMPONENTS
// #STEPS
// 1- Import this file as module in app.module.ts ==> import { MaterialModule } from './xyz/abc';
// 2- Initialize it in imports:[] array ==> imports:[MaterialModule]
// *************** FORM CONTROLS ***************
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; //FROM ANGULAR CORE
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// *************** NAVIGATION ***************
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

// *************** LAYOUT ***************
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';

// *************** BUTTONS & INDICATORS ***************
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';

// *************** POPUPS & MODALS ***************
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// *************** DATA TABLE ***************
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
// *************** Browser Animations Module ***************
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// *************** FontAwesome Module ***************
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const AllMaterialModules = [
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatStepperModule,
  MatTabsModule,
  MatTreeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatRippleModule,
  MatBottomSheetModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  BrowserAnimationsModule,
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    DetailComponent,
    DashboardComponent,
    UserListComponent,
    AdminListComponent,
    PolicyListComponent,
    UserTemplateComponent,
    AdminTemplateComponent,
    NotFoundComponent,
    AdminRegisterComponent,
    AdminLoginComponent,
    TransactionListComponent,
    AdminProfileComponent,
    AboutUsComponent,
    ContactUsComponent,
    IndexTemplateComponent,
    OrderComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AllMaterialModules,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
