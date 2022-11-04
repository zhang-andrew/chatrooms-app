import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogoutButtonComponent } from './logout-button.component';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-top-bar',
    standalone: true,
    imports: [CommonModule, LogoutButtonComponent],
    template: `
        <!-- <div class="top-bar"> -->
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <!-- <li><a href="/users">Users</a></li> -->
                    <li><a href="/rooms">Rooms</a></li>
                    <!-- <li><a href="/login">Login</a></li> -->
                    <li *ngIf="authService.isLoggedIn"><app-logout-button></app-logout-button></li>
                    <!-- <a (click)="openLoginForm()" *ngIf="!loggedIn"> 
                        <i class="fa fa-lock"></i> Login / Register</a> 
                    <a (click)="openMyAccountForm()" *ngIf="loggedIn"> 
                        <i class="fa fa-lock"></i> My Account</a>  -->
                </ul>
            </nav>
        <!-- </div> -->
    `,
    styles: [`
        nav {
            height: 100%;
            outline: 1px dashed blue;
            outline-offset: -1px;
        }
    `]
})
export class TopBarComponent implements OnInit {
    constructor(private router: Router,  readonly authService: AuthService) { 
    }

    ngOnInit(): void {
    }

}
