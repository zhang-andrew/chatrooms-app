import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogoutButtonComponent } from './logout-button.component';

@Component({
    selector: 'app-top-bar',
    standalone: true,
    imports: [CommonModule, LogoutButtonComponent],
    template: `
        <nav>
            <p>
            top-bar works!
            </p>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/users">Users</a></li>
                <li><a href="/rooms">Rooms</a></li>
                <li><a href="/login">Login</a></li>
                <li><app-logout-button></app-logout-button></li>
            </ul>
        </nav>
    `,
    styles: [`
        nav {
            outline: 1px dashed blue;
            outline-offset: -1px;
        }
    `]
})
export class TopBarComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

}
