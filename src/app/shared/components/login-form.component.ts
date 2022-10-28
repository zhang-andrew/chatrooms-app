import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//Modules
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="login-form">
            <h2>login below</h2>
            <button (click)="loginWithGoogle()">Google Login</button>
            <label for="">OR</label>
            <form class="form" [formGroup]="form" (ngSubmit)="onSubmit()">    
                <div>
                    <label>Email</label>
                    <input formControlName="email" type="text" required>
                    <div *ngIf="email?.hasError('required')">
                        Email is required.
                    </div>
                    <div *ngIf="email?.hasError('email')">
                        Email isn't valid. Please enter a valid email.
                    </div>
                </div>
                <div>
                    <label>Password</label>
                    <input formControlName="password" type="password" required>
                    <div *ngIf="password?.hasError('required')">
                        Password is required
                    </div>
                </div>
                <div>
                    <button [disabled]="form.invalid">
                        Submit
                    </button>
                </div>
            </form>
        </div>
        
    `,
    styles: [`
        .login-form{
            display: flex;
            align-items: center;
            flex-direction: column;

            outline: 1px dashed red;
            outline-offset: -1px;
        }
        form{
            display: flex;
            align-items: center;
            flex-direction: column;

            /* padding: 1rem;
            outline: 1px solid black;
            outline-offset: -1px; */
        }
    `]
})
export class LoginFormComponent implements OnInit {
    //props
    // @Input() authService: AuthService | undefined;
    // @Output() formData: EventEmitter<{ email: string; password: string; }> = new EventEmitter();
    form: FormGroup;

    //constructors
    constructor(private formBuilder: FormBuilder, private readonly authService: AuthService, private readonly router: Router) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        })
    }

    get email(){
        return this.form.get('email');
    }
    get password(){
        return this.form.get('password');
    }
    onSubmit(){
        // this.formData.emit(this.form.value);
        this.login(this.form.value)
        console.log("Submitted");
        
    }

    private login(loginData: any){
        this.authService.login(loginData)
            .then(() => {
                console.log("SUCCESS");
                // this.router.navigate(['/dashboard']);
                return;
            })
            .catch((e) => {console.log(e.message);})
    }
    loginWithGoogle(){
        this.authService.loginWithGoogle();
    }
}
