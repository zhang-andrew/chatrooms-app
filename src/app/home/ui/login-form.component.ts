import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SingletonService } from 'src/app/shared/services/singleton.service';


@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, IonicModule],
    template: `
        <div class="wrapper">
            <ion-list >
                <ion-item>
                    <ion-button class="provider-btn az-text-transform-none" color="dark" (click)="loginAsGuest()" >
                        <!-- <ion-icon slot="start" name="logo-google"></ion-icon> -->
                        Log in as Guest
                    </ion-button>
                </ion-item>
                <ion-item>
                    <ion-button class="provider-btn az-text-transform-none" (click)="loginWithGoogle()" >
                        <ion-icon slot="start" name="logo-google"></ion-icon>
                        Log in with Google
                    </ion-button>        
                </ion-item>
            </ion-list>
            
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
                        <ion-button role="button" type="submit" color="tertiary">Log In</ion-button>        
                    </form>
                </ion-card-content>
            </ion-card>

            
        </div>

    `,
    styles: [`
        :host {
            position: relative;
            > div{
                padding: 1rem;
            }
        }
        ion-card {
            box-shadow: none !important;
            border: 1px solid rgba(0,0,0,0.1);
        }

        ion-button { 
            display: block;
            width: 100%;
        }
        ion-button.provider-btn {
            ion-icon{
                padding-right: 1rem;
            }
        }
        /* .provider-btn::part(native) {
        } */

        /* .disabled {
            pointer-events: none;
            opacity: 0.4;
        } */

        /* .spinner {
            position: absolute !important;
            top: 50%;
            left: 50%;
            transform: translateX(-50%);
            display: none;

            &.active{
                display: block;
            }
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
    constructor(private formBuilder: FormBuilder, 
        private readonly authService: AuthService, 
        private readonly router: Router,
        private readonly singletonService: SingletonService) { }

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

    async loginOnSubmit(){
        //turn on spinner, disable form
        this.disablePages();
        // document.querySelector(".spinner").classList.add("active");

        const formValues = this.loginForm.value; //returns an object containing form values
        this.authService.login(formValues)
            .then(result => {
                console.log(result)
                this.enablePages();
            })
            .catch(error => {
                //if error turn off spinner, reenable form
                document.querySelector(".wrapper").classList.remove("disabled");
                document.querySelector(".spinner").classList.remove("active");
                console.log(error)
            });
    }

    async loginAsGuest(){
        //turn on spinner, disable form
        this.disablePages();
        // document.querySelector(".spinner").classList.add("active");

        this.authService.loginAsGuest()
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    }

    loginWithGoogle(){
        //turn on spinner, disable form
        // document.querySelector(".wrapper").classList.add("disabled");
        this.disablePages();
        // document.querySelector(".spinner").classList.add("active");

        // this.authService.loginWithGoogle();
        this.authService.loginWithProvider("google")
            .then(result => {
                console.log(result)
                this.enablePages();
            })
            .catch(error => {
                //if error turn off spinner, reenable form
                this.enablePages();
                // document.querySelector(".spinner").classList.remove("active");
                console.log(error)
            });
    }

    private disablePages(){
        //enable spinner
        this.singletonService.props.showSpinner = true;

        //disable all pages
        const pageElements = document.querySelectorAll('.page');
        pageElements.forEach((page) => {
            page.classList.add("disabled");
            console.log(page.classList);
        })
        
    }
    private enablePages(){
        //enable all pages
        const pageElements = document.querySelectorAll('.page');
        pageElements.forEach((page) => {
            page.classList.remove("disabled");
            console.log(page.classList);
        })
        //disable spinner
        this.singletonService.props.showSpinner = false;
    }
}
