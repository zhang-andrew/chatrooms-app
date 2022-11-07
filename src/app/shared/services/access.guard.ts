import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, from, tap} from 'rxjs';
import { AuthService } from './auth.service';
import { RoomsService } from './rooms.service';

@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanActivate {
    constructor( private router: Router, private readonly authService: AuthService, private readonly roomsService: RoomsService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const requiresLogin = route.data["requiresLogin"] || false;
        const serverConfirmRoom = route.data["serverConfirmRoom"] || false;

        if (serverConfirmRoom){
            console.log('Checking with server...')
            // console.log(route.paramMap);
            // console.log(route.paramMap.get('roomId'));
            const roomIdFromRoute = String(route.paramMap.get('roomId'));
            const roomObservable = from(this.roomsService.getRoom(roomIdFromRoute));

            return roomObservable.pipe(
                tap(room => console.log("starting server check")),
                tap(room => {
                    if (room){
                        console.log("this room does exist in database");
                    } else {
                        console.log("this room does NOT exist in database");
                    }
                }),
                map(room => room || this.router.createUrlTree(['rooms'])),
            )
        }
        if (requiresLogin){
            //Logic to check if user is logged in..
            console.log('accessGuard - loading...');

            // Create an Observable out of an async function with rxjs.from()
            // (An observable represents a stream, or source of data that can arrive over time.)
            const loggedInStatus = from(this.authService.getLoginStatus());

            // return this.authService.getLoginStatus2().pipe;

            //return the Observable stream through a pipe, manipulating the data returned by the stream. 
            return loggedInStatus.pipe(
                // tap(x => console.log("starting pipe")),
                // tap(x => console.log(x)),
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
