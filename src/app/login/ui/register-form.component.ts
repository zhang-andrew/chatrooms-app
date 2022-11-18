import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
//Modules
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-register-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, IonicModule],
    template: `
        <div class="wrapper">
            

            <ion-card>
                <ion-card-content>
                    <form [formGroup]="form" (ngSubmit)="onSubmit()" (keydown.enter)="onSubmit()">
                        <ion-list>
                            <ion-item class="ion-no-padding">
                                <ion-input type="email" placeholder="Email" formControlName="email" required></ion-input>
                            </ion-item>
                            <div class="az-validation-errors" *ngIf="emailInput?.hasError('required') && emailInput?.touched">
                                <ion-text color="danger">Email cannot be empty.</ion-text>
                            </div>
                            <div class="az-validation-errors" *ngIf="emailInput?.hasError('email') && emailInput?.touched">
                                <ion-text  color="danger">Email isn't valid. Please enter a valid email.</ion-text>
                            </div>

                            <ion-item class="ion-no-padding">
                                <ion-input type="password" placeholder="Password" formControlName="password" required></ion-input>
                            </ion-item>
                            <div *ngIf="passwordInput?.hasError('required') && emailInput?.touched">
                                <ion-text color="danger">Password cannot be empty.</ion-text>
                            </div>
                        </ion-list>
                        <ion-button role="button" class="ion-padding ion-margin" type="submit" color="tertiary">Sign Up</ion-button>        
                    </form>
                </ion-card-content>
            </ion-card>

            
        </div>
        
    `,
    styles: [`
:host {
            position: relative;
            display: block;
            width: 100%;
            
            .wrapper{
                width: 100%;
                padding: 1rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: space-between;
            }
        }

        ion-card {
            box-shadow: none !important;
            border: 1px solid rgba(0,0,0,0.1);
            width: 100%;
            /* padding: auto; */
            
        }
        ion-card-content {
            width: 100%;
        }

        ion-button { 
            display: block;
            /* width: 100%; */
        }
        ion-button.provider-btn {
            ion-icon{
                padding-right: 1rem;
            }
        }
        .provider-btn {
            width: 100%;
        }

        form{
            padding: 0.5rem;
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

    get emailInput(){
        return this.form.get('email');
    }
    get passwordInput(){
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
