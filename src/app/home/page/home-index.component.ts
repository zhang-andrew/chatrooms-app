import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//imported components
import { LoginFormComponent } from '../ui/login-form.component';

@Component({
    selector: 'app-home-index',
    standalone: true,
    imports: [CommonModule, LoginFormComponent],
    template: `
        <p>
        home-index works!
        </p>
        <app-login-form></app-login-form>
    `,
    styles: [
    ]
})
export class HomeIndexComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
    }

}
