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
        <!-- <p>
        home-index works!
        </p> -->
        <!-- <div class="page"> -->
            <app-login-form></app-login-form>
            <app-register-form></app-register-form>
        <!-- </div> -->
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
