import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthenticateService } from "../authenticate.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticateService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isLoggedIn = this.authService.LoggedIn;
    let currentUser = this.authService.GetCredential;
    if (isLoggedIn) {
      req = req.clone({ setHeaders: { Authorization: `${currentUser?.data.access_token}` } });
    }
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) this.authService.Logout();
      return throwError(() => err);
    }));
  }
}
