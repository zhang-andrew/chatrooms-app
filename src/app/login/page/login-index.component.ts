import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RegisterFormComponent } from 'src/app/login/ui/register-form.component';
import { LoginFormComponent } from 'src/app/login/ui/login-form.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-index',
    standalone: true,
    imports: [CommonModule, LoginFormComponent, RegisterFormComponent, IonicModule],
    template: `
        <div class="page">

            <div class="logo-container">
                <ion-button class="logo-button" (click)="navigateTo('/')" size="large">
                    <ion-icon name="people-circle-outline"></ion-icon>
                    Chatrooms
                </ion-button>        
            </div>
            <ion-card>
                <ion-segment value="login" (ionChange)="segmentChanged($event)">
                    <ion-segment-button value="login">
                        <ion-label>Log in</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="register">
                        <ion-label>Sign up</ion-label>
                    </ion-segment-button>
                </ion-segment> 

                <app-login-form *ngIf="this.segmentValue == 'login'"></app-login-form>
                <app-register-form *ngIf="this.segmentValue == 'register'"></app-register-form>
                <!-- <p>
                    login-index works!
                </p> -->

            </ion-card>
        </div>
        
    `,
    styles: [`
        :host > div{
            height: 100%;
            width: 100%;
            display: grid;
            place-content: center;
        }
        .disabled {
            pointer-events: none;
            opacity: 0.4;
        }

        .logo-button{
            --box-shadow: none;
            --background: transparent;
            --color: black;
            ion-icon{
                padding-right: 0.3rem;
            }
        }
        .logo-container{
            padding: 1rem;
            display: grid;
            place-content: center;
        }
    `]
})
export class LoginIndexComponent implements OnInit {
    segmentValue = 'login';

    constructor(private readonly router: Router) { }

    ngOnInit(): void {
    }

    public segmentChanged(e){
        console.log(e.detail.value)
        this.segmentValue = e.detail.value;
    }


    navigateTo(path){
        //show spinner

        //navigate
        this.router.navigate([path]).then(()=>{
            // console.log("LOADED!");
            // this.showSpinner = false;
        })

        //hide menu
        // this.sideMenu.close();
        // try {
        //     document.querySelector(".wrapper").classList.remove("disabled");
        //     document.querySelector(".spinner").classList.remove("active");            
        // } catch (error) {
        // }
    }

}
