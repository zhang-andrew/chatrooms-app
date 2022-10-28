import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-users-index',
    standalone: true,
    imports: [CommonModule],
    template: `
        <p>
        users-index works!
        </p>
    `,
    styles: [`
        * {
            background-color: red;
        }
    `]
})
export class UsersIndexComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
