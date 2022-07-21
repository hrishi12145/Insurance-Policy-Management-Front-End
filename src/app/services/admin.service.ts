import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Admin } from '../model/admin';
import { Policy } from '../model/policy';
import { Transaction } from '../model/transaction';

let API_URL = 'http://localhost:9594/insurance/admin/';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public currentAdmin: Observable<Admin>;
  private currentAdminSubject: BehaviorSubject<Admin>;

  constructor(private http: HttpClient) {
    this.currentAdminSubject = new BehaviorSubject<Admin>(
      JSON.parse(localStorage.getItem('currentAdmin'))
    );
    this.currentAdmin = this.currentAdminSubject.asObservable();
  }
  public get currentAdminValue(): Admin {
    return this.currentAdminSubject.value;
  }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  /*========================================
   Admin CRUD Methods for consuming RESTful API
  =========================================*/

  // HttpClient API post() method => admin Registration
  register(admin: Admin): Observable<Admin> {
    return this.http
      .post<Admin>(API_URL + 'register', JSON.stringify(admin), {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Admin Login //
  login(admin: Admin): Observable<Admin> {
    return this.http
      .post<Admin>(API_URL + 'login', JSON.stringify(admin), this.httpOptions)
      .pipe(
        map((response) => {
          if (response) {
            localStorage.setItem('currentAdmin', JSON.stringify(response));
            this.currentAdminSubject.next(response);
          }
          return response;
        })
      );
  }
  // HttpClient API post() method => User Logged Out
  logOut(): Observable<any> {
    return this.http.post(API_URL + 'user/logout', this.httpOptions).pipe(
      map((response) => {
        localStorage.removeItem('currentAdmin');
        this.currentAdminSubject.next(null);
      })
    );
  }

  // HttpClient API get() method => Fetch Admin List Details
  getAllAdmins(): Observable<Admin[]> {
    return this.http
      .get<Admin[]>(API_URL + 'getAdmins', {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch searched Admin List Details
  searchAdmin(theKeyword: string): Observable<Admin[]> {
    return this.http
      .get<Admin[]>(API_URL + 'searchedByName/' + `${theKeyword}`, {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Admin Details by Id
  getAdminById(id: any): Observable<Admin> {
    return this.http
      .get<Admin>(API_URL + 'getAdminsById/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update Admin Details
  updateAdmin(id: any, admin: any): Observable<Admin> {
    return this.http
      .put<Admin>(
        API_URL + 'update/' + id,
        JSON.stringify(admin),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete Admin
  deleteAdmin(id: any) {
    return this.http
      .delete<Admin>(API_URL + 'delete/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /*========================================
   Policy CRUD Methods for consuming RESTful API
  =========================================*/

  // HttpClient API get() method => Fetch Policy List Details
  getAllPolicies(): Observable<Policy[]> {
    return this.http
      .get<Policy[]>(API_URL + 'policy/getPolicies', {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Policy Details by Id
  getPolicyById(id: Policy): Observable<Policy[]> {
    return this.http
      .get<Policy[]>(API_URL + 'policy/getPolicyById/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Policy Registration
  createPolicy(policy: Policy): Observable<Policy> {
    return this.http
      .post<Policy>(API_URL + 'policy/register', JSON.stringify(policy), {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update Policy Details
  updatePolicy(id: any, policy: any): Observable<Policy> {
    return this.http
      .put<Policy>(
        API_URL + 'policy/update/' + id,
        JSON.stringify(policy),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete Policy
  deletePolicy(id: any) {
    return this.http
      .delete<Policy>(API_URL + 'policy/delete/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /*========================================
   User CRUD Methods for consuming RESTful API
  =========================================*/

  // HttpClient API get() method => Fetch User List Details
  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(API_URL + 'user/getUsers', {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch searched User List Details
  searchUsers(theKeyword: string): Observable<User[]> {
    return this.http
      .get<User[]>(API_URL + 'user/searchedByName/' + `${theKeyword}`, {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch User Details by Id
  getUserById(id: number): Observable<any> {
    return this.http
      .get<any>(API_URL + 'user/getUsersById/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update User Details
  updateUser(id: any, user: User): Observable<User> {
    return this.http
      .put<User>(
        API_URL + 'user/update/' + id,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete Admin
  deleteUser(id: any): Observable<User> {
    return this.http
      .delete<User>(API_URL + 'user/delete/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /*========================================
   Transaction CRUD Methods for consuming RESTful API
  =========================================*/

  // HttpClient API get() method => Fetch Transaction List Details
  getAllTransactions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(API_URL + 'transaction/getAll', {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  /*========================================
           Error handling Methods
  =========================================*/
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
