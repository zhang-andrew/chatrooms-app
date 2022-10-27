import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <p>
        login-form works!
        <button>Login</button>
        </p>
    `,
    styles: [
    ]
})
export class LoginFormComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
    }

}
