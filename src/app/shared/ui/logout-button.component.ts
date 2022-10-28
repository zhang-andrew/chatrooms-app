import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout-button',
    standalone: true,
    imports: [CommonModule],
    template: `
        <!-- <p>
        logout-button works!
        </p> -->
        <button (click)="attemptLogout()">Log out</button>
    `,
    styles: [
    ]
})
export class LogoutButtonComponent implements OnInit {
    constructor(private readonly authService: AuthService, private readonly router: Router) { }

    ngOnInit(): void {
    }

    attemptLogout(){
        this.authService.logout()
            .then(() => {
                this.router.navigate(['/']);
            })
            .catch((e) => { 
                console.log(e.message);
            })
    }

}
