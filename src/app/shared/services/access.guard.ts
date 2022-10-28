import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, from, tap} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanActivate {
    constructor( private router: Router, private readonly authService: AuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const requiresLogin = route.data["requiresLogin"] || false;
        if (requiresLogin){
            //Logic to check if user is logged in..
            console.log('loading...');

            // Create an Observable out of an async function with rxjs.from()
            // (An observable represents a stream, or source of data that can arrive over time.)
            const loggedInStatus = from(this.authService.getLoginStatus());

            // return this.authService.getLoginStatus2().pipe;

            //return the Observable stream through a pipe, manipulating the data returned by the stream. 
            return loggedInStatus.pipe(
                tap(x => console.log("starting pipe")),
                tap(x => console.log(x)),
                map(loginStatus => loginStatus || this.router.createUrlTree([''])),
            )
            // //old function
            // return this.authService.getLoginStatus();
        }
        console.log("this got hit returned true");
        // return false;
        return true;
    }

}
