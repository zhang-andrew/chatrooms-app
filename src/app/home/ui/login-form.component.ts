import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, IonicModule],
    template: `
        <div>
            <ion-button class="az-text-transform-none" (click)="loginWithGoogle()" >
                <ion-icon slot="start" name="logo-google"></ion-icon>
                Sign in with Google
            </ion-button>

            <div class="ion-text-center ion-padding">
                OR
            </div>

            <ion-card>
                <ion-card-content>
                    <form [formGroup]="loginForm" (ngSubmit)="loginOnSubmit()" (keydown.enter)="loginOnSubmit()">
                        <ion-list>
                            <ion-item>
                                <ion-input placeholder="Email" formControlName="email" required></ion-input>
                            </ion-item>
                            <div class="az-validation-errors" *ngIf="emailInput?.hasError('required')">
                                <ion-text color="danger">Email cannot be empty.</ion-text>
                            </div>
                            <div class="az-validation-errors" *ngIf="emailInput?.hasError('email')">
                                <ion-text color="danger">Email isn't valid. Please enter a valid email.</ion-text>
                            </div>

                            <ion-item>
                                <ion-input placeholder="Password" formControlName="password" required></ion-input>
                            </ion-item>
                            <div *ngIf="passwordInput?.hasError('required')">
                                <ion-text color="danger">Password cannot be empty.</ion-text>
                            </div>
                        </ion-list>
                        <ion-button role="button" type="submit">Login</ion-button>        
                    </form>
                </ion-card-content>
            </ion-card>

        </div>
    `,
    styles: [`
        :host{
            > div{
                padding: 1rem;
            }
            
        }

        ion-button {
            width: 100%;
            ion-icon{
                padding-right: 1rem;
            }
        }
        /* form{
            display: flex;
            align-items: center;
            flex-direction: column;
        } */
    `]
})
export class LoginFormComponent implements OnInit {
    //props
    // @Input() authService: AuthService | undefined;
    // @Output() formData: EventEmitter<{ email: string; password: string; }> = new EventEmitter();
    
    loginForm: FormGroup;
    // form: FormGroup; //that we want to fill

    //constructors
    constructor(private formBuilder: FormBuilder, private readonly authService: AuthService, private readonly router: Router) { }

    ngOnInit(): void {
        // this.form = this.formBuilder.group({
        //     email: ['', [Validators.required, Validators.email]],
        //     password: ['', [Validators.required]]
        // })

        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        })
    }

    get emailInput(){
        return this.loginForm.get('email');   
    }
    get passwordInput(){
        return this.loginForm.get('password');   
    }

    // get email(){
    //     return this.form.get('email');
    // }
    // get password(){
    //     return this.form.get('password');
    // }
    // onSubmit(){
    //     // this.formData.emit(this.form.value);
    //     this.login(this.form.value)
    //     console.log("Submitted");
        
    // }



    // private login(loginData: any){
    //     this.authService.login(loginData)
    //         .then(() => {
    //             console.log("SUCCESS");
    //             // this.router.navigate(['/dashboard']);
    //             return;
    //         })
    //         .catch((e) => {console.log(e.message);})
    // }

    loginOnSubmit(){
        const formValues = this.loginForm.value; //returns an object containing form values
        this.authService.login(formValues)
            .then( result => console.log(result))
            .catch(e => console.log(e.message))
    }

    loginWithGoogle(){
        // this.authService.loginWithGoogle();
        this.authService.loginWithProvider("google");
    }
}
