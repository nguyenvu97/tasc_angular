import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, model} from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, catchError, map, Observable, throwError} from 'rxjs';
import { environment } from '../../environments/environment';
import {AuthenRequest, Response_Data} from '../models/authen';
import {Info_customer} from "../models/info_customer";
import {Customer} from "../models/Customer";
const BaseUrl = environment.ApiUrl;
const Endpoint = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private response :  Response_Data<AuthenRequest> | null = null;
  private customer: Info_customer | null = null;



  customerSubject: BehaviorSubject<Info_customer | null>;
  credentialSubject: BehaviorSubject<Response_Data<AuthenRequest> | null>;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.customerSubject = new BehaviorSubject<Info_customer | null>(null);
    this.credentialSubject = new BehaviorSubject<Response_Data<AuthenRequest> | null>(null);
  }
   get LoggedIn(): boolean {
     return !(JSON.stringify(this.credentialSubject.value) === '{}'|| this.credentialSubject.value == null)
  }
  get GetCredential() { return this.credentialSubject.value; }
  Login = (model: AuthenRequest): Observable<Response_Data<AuthenRequest>> => this.httpClient.post<Response_Data<AuthenRequest>>(`${BaseUrl}/${Endpoint}/login`, model);
  Decode = (token : any): Observable<Response_Data<Info_customer>> => {

    const headers = new HttpHeaders({
      'Authorization':`${token}`,
      'Accept': 'application/json'
    });
    return this.httpClient.get<Response_Data<Info_customer>>(`${BaseUrl}/${Endpoint}/decode`,{headers});
  }
  getCustomerInfo(token: string): Observable<Info_customer> {
    return this.Decode(token).pipe(
      map(res => {
        if (res.status_code === 200 && res.data != null) {
          // Khi có dữ liệu hợp lệ, phát giá trị vào customerSubject
          this.customerSubject.next(res.data);
          return res.data; // Trả về dữ liệu cho các thành phần khác cần subscribe
        } else {
          throw new Error('Failed to get customer data');
        }
      }),
      catchError(error => {
        console.error(error);
        return throwError('Something went wrong while fetching customer data');
      })
    );
  }


  Register = (model : Customer): Observable<Response_Data<String>>  => this.httpClient.post<Response_Data<String>>(`${BaseUrl}/${Endpoint}/register`, model);

  Logout() {
    localStorage.removeItem('credential');
    this.credentialSubject.next(JSON.parse('{}'));
    this.router.navigate(['login']);
  }
}
