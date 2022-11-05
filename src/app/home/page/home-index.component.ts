import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//imported components
// import { LoginFormComponent } from '../../shared/components/login-form.component';
// import { RegisterFormComponent } from '../../shared/components/register-form.component';
import { RegisterFormComponent } from '../ui/register-form.component';
import { LoginFormComponent } from '../ui/login-form.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-home-index',
    standalone: true,
    imports: [CommonModule, LoginFormComponent, RegisterFormComponent, IonicModule],
    template: `
        <div>
            <ion-card>
                <ion-segment value="login" (ionChange)="segmentChanged($event)">
                    <ion-segment-button value="login">
                        <ion-label>Login</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="register">
                        <ion-label>Register</ion-label>
                    </ion-segment-button>
                </ion-segment> 

                <app-login-form *ngIf="this.segmentValue == 'login'"></app-login-form>
                <app-register-form *ngIf="this.segmentValue == 'register'"></app-register-form>
            </ion-card>
        </div>
    `,
    styles: [`
        :host > div{
            height: 100%;
            width: 100%;
            display: grid;
            
            /* place-content: center; */
            justify-content: center;
            align-items: start;
            
            margin-top: 20%;
        }
    `]
})
export class HomeIndexComponent implements OnInit {
    segmentValue = 'login';

    constructor() {}

    ngOnInit(): void {
    }

    segmentChanged(e){
        console.log(e.detail.value)
        this.segmentValue = e.detail.value;
    }
}
