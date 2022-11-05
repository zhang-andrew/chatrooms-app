import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
//Modules
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="register-form">
            <h2>
                Register Here
            </h2>
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
        .register-form{
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
        }
    `]
})
export class RegisterFormComponent implements OnInit {
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
        this.attemptRegister(this.form.value)
    }

    private attemptRegister(suppliedData: any){
        this.authService.register(suppliedData)
            .then((result) => {
                // console.log(result);
                // console.log("Register SUCCESS");
                return;
            })
            .catch((e) => {
                console.log(e.message);
                console.log("accoutn already exists");
            })
    }
}
