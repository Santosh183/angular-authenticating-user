import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({ providedIn: 'root' }) // by declaring here like this we dont need further this service to add in route module

export class AuthGuard implements CanActivate { // to make guard we need to implement CanActivate interface
                                                // which has method canActivate which return boolean.
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // check if route data contain some roles  i.e. if it is restricted for few roles then checking
            // if current user role is permitted or not
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the current url for future reference.
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
