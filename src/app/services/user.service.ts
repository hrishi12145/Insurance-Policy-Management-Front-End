import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Policy } from '../model/policy';
import { Transaction } from '../model/transaction';

let API_URL = 'http://localhost:9594/insurance/user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  /*========================================
   User CRUD Methods for consuming RESTful API
  =========================================*/

  // HttpClient API get() method => User Login //
  login(user: User): Observable<User> {
    return this.http
      .post<User>(API_URL + 'login', JSON.stringify(user), this.httpOptions)
      .pipe(
        map((response) => {
          if (response) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
          return response;
        })
      );
  }

  // HttpClient API post() method => User Logged Out
  logOut(): Observable<any> {
    return this.http.post(API_URL + 'logout', this.httpOptions).pipe(
      map((response) => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      })
    );
  }

  // HttpClient API post() method => User Registration
  register(user: User): Observable<User> {
    return this.http
      .post<User>(API_URL + 'register', JSON.stringify(user), {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update User Details
  updateUser(id: any, user: any): Observable<User> {
    return this.http
      .put<User>(
        API_URL + 'update/' + id,
        JSON.stringify(user),
        this.httpOptions
      )
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

  // HttpClient API get() method => Fetch searched Policy List Details
  searchPolicies(theKeyword: string): Observable<Policy[]> {
    return this.http
      .get<Policy[]>(API_URL + 'policy/searchedByPolicy/' + `${theKeyword}`, {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Policy Details
  getPolicyById(id: any): Observable<Policy> {
    return this.http
      .get<Policy>(API_URL + 'policy/getPolicyById/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  /*========================================
   Transaction CRUD Methods for consuming RESTful API
  =========================================*/

  // HttpClient API post() method => Purchase Policy
  purchasePolicy(transaction: Transaction): Observable<any> {
    return this.http
      .post(API_URL + 'purchasePolicy', JSON.stringify(transaction), {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Transaction Details By Id
  getTransactionById(id: number): Observable<Transaction> {
    return this.http
      .get<Transaction>(API_URL + 'transaction/getTransactionById/' + id)
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
