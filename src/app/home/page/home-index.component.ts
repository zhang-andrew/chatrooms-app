import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//imported components
// import { LoginFormComponent } from '../../shared/components/login-form.component';
// import { RegisterFormComponent } from '../../shared/components/register-form.component';
// import { RegisterFormComponent } from '../ui/register-form.component';
// import { LoginFormComponent } from '../../login/ui/login-form.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-home-index',
    standalone: true,
    imports: [CommonModule, IonicModule], //LoginFormComponent, RegisterFormComponent, IonicModule],
    template: `
        <div class="page">

            <ion-list lines="none">
                <ion-item>
                    <div class="ion-text-center" style="width: 100%">
                        <ion-text class="ion-text-wrap ">
                            <h1>
                                Chat live to other users with this simple messenger app.
                            </h1>
                        </ion-text>
                    </div>
                </ion-item>
                <ion-item>
                    <div class="ion-text-center" style="width: 100%">
                        <ion-text class="ion-text-wrap ">
                            <h2>
                                Try it out <a href="/login">here</a>.
                            </h2>
                        </ion-text>
                    </div>
                </ion-item>
                <ion-item>
                    <div  class="ion-text-center" style="width: 100%">
                        <ion-text class="ion-text-wrap">
                            This web app was developed as a personal project to learn the Angular <ion-icon name="logo-angular"></ion-icon> framework.
                        </ion-text>
                        
                    </div>
                </ion-item>
                <ion-item class="ion-padding">
                    <ion-button href="https://github.com/zhang-andrew">
                        <ion-icon name="logo-github"></ion-icon>
                        <ion-text class="ion-text-lowercase">
                            &#160;/zhang-andrew
                        </ion-text>
                    </ion-button>
                </ion-item>
            </ion-list>
            
            <!-- <ion-card class="page">
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
            </ion-card> -->
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
        ion-item, ion-list{
            --background: transparent;
            --background-color: transparent;
            background-color: transparent;
            text-align: center;
        }
        ion-item{
        }
    `]
})
export class HomeIndexComponent implements OnInit {
    segmentValue = 'login';

    constructor() {}

    ngOnInit(): void {
    }

    // segmentChanged(e){
    //     console.log(e.detail.value)
    //     this.segmentValue = e.detail.value;
    // }
}
