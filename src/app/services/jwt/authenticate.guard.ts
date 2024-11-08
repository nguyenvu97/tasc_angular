import { Injectable } from "@angular/core";
import { AuthenticateService } from "../authenticate.service";
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelperService = new JwtHelperService();
@Injectable({
    providedIn: 'root',
})
export class AuthenticateGuard {
    constructor(private authService: AuthenticateService) { }

    canActivate(): boolean {
        let isLoggedIn = this.authService.LoggedIn;
        let currentUser = this.authService.GetCredential;
        //Check if the token is expired or not and if token is expired then redirect to login page and return false
        if (isLoggedIn && currentUser && !jwtHelperService.isTokenExpired(currentUser.data.access_token)) return true;
        this.authService.Logout();
        return false;
    }

}
