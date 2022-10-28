import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//imported components
import { LoginFormComponent } from '../../shared/components/login-form.component';
import { RegisterFormComponent } from '../../shared/components/register-form.component';


@Component({
    selector: 'app-home-index',
    standalone: true,
    imports: [CommonModule, LoginFormComponent, RegisterFormComponent],
    template: `
        <p>
        home-index works!
        </p>
        <app-login-form></app-login-form>
        <app-register-form></app-register-form>
    `,
    styles: [
    ]
})
export class HomeIndexComponent implements OnInit {
    // constructor(public authService: AuthService) { }
    constructor() { }

    ngOnInit(): void {
    }

}
