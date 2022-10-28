import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from '../../shared/ui/login-form.component';
import { RegisterFormComponent } from '../../shared/ui/register-form.component';

@Component({
    selector: 'app-login-index',
    standalone: true,
    imports: [CommonModule],
    template: `
        <p>
        login-index works!
        </p>
    `,
    styles: [
    ]
})
export class LoginIndexComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
    }

}
