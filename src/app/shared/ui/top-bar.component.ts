import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-top-bar',
    standalone: true,
    imports: [CommonModule],
    template: `
        <nav>
            <p>
            top-bar works!
            </p>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/users">Users</a></li>
                <li><a href="/rooms">Rooms</a></li>
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
