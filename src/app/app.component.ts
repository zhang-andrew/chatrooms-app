import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
// import { AuthService } from './services/auth.service';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';

@Component({
    selector: 'app-root',
    // templateUrl: './app.component.html',
    // styleUrls: ['./app.component.scss'],
    template: `
        <ion-menu contentId="main-content" type="overlay" side="end">
            <ion-header class="ion-no-border">
                <ion-menu-toggle>
                    <ion-button class="x-button ion-padding" color="light">
                        <span>
                            <ion-icon slot="icon-only" name="close-outline"></ion-icon>
                        </span>
                    </ion-button>
                </ion-menu-toggle>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-list class="">
                    <ion-item>
                        <ion-button expand="block" fill="clear" href="/rooms">
                            <span>
                                <ion-icon slot="icon-only" name="chatbubbles-outline"></ion-icon>
                                <div slot="start">Rooms</div>
                                
                            </span>
                        </ion-button>
                    </ion-item>
                    <ion-item>
                        <ion-button expand="block" fill="clear" href="/profile">
                            <span>
                                <ion-icon slot="icon-only" name="person-circle-outline"></ion-icon>
                                <div slot="start">Profile</div>

                            </span>
                        </ion-button>
                    </ion-item>
                    <!-- <ion-item>
                        <ion-button expand="block" fill="clear" >
                            <span>
                                <ion-icon slot="icon-only" name="log-in-outline"></ion-icon>
                                <div slot="start">Log in</div>
                            </span>
                        </ion-button>
                    </ion-item> -->
                    <ion-item>
                        <ion-button expand="block" fill="clear" (click)="attemptLogout()">
                            <span>
                                <ion-icon slot="icon-only" name="log-out-outline"></ion-icon>
                                <div slot="start">Log out</div>
                            </span>
                        </ion-button>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-menu>

        <ion-header class="ion-no-border">
            <ion-grid>
                <ion-row class="ion-justify-content-between ion-align-items-center ion-padding">
                    <ion-col size="auto">
                        <a href="/">
                            <ion-button class="logo-button" [href]="">
                                <ion-icon name="people-circle-outline"></ion-icon>
                                Chatrooms
                            </ion-button>        
                        </a>
                    </ion-col>
                    <ion-col size="auto">
                        <ion-toolbar>
                            <ion-buttons slot="start">
                                <!-- <ion-menu-button auto-hide="false"></ion-menu-button> -->
                                <ion-menu-button auto-hide="false"></ion-menu-button>
                            </ion-buttons>
                        </ion-toolbar>  
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-header>
        <!-- <app-top-bar></app-top-bar> -->
        <!-- <app-header></app-header> -->
        <!-- <router-outlet id="main-content"></router-outlet> -->
        <ion-router-outlet id="main-content"></ion-router-outlet>

        <!-- <div>Toast Notifications</div> -->
    `,
    styles: [`
        :host{}
        ion-header{
            outline: 1px dashed rgba(5,5,5,0.2);
            outline-offset: -1px;
        }
        ion-toolbar{
            --background: transparent;
        }
        .logo-button{
            --box-shadow: none;
            --background: transparent;
            --color: black;
            ion-icon{
                padding-right: 0.3rem;
            }
        }
        .x-button{
            /* --box-shadow: none; */
            /* --background: transparent; */
            /* --color: black; */
            width: auto;
            float: right;

            /* span{
                font-size: 2rem;
            } */
        }

        ion-item{
            --padding-top: 0px;
            --padding-start: 0px;
            --padding-end: 0px;
            --padding-bottom: 0px;
            --inner-padding-end: 0px;
            --inner-padding-start: 0px;
            --inner-padding-top: 0px;
            --inner-padding-bottom: 0px;
        }
        ion-button{
            height: 100%;
            width: 100%;
            --box-shadow: none;
            span{
                /* text-align:left; */
                width:100%;
                display: flex;
                justify-content: start;
                align-items: center;
            }
        }
        ion-icon[slot='icon-only']{
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            font-size: 1.5rem;
        }
        ion-text[slot='start']{
            font-size: 2rem;
        }
    `]
})
export class AppComponent {
    title = 'chatrooms';

    constructor(private authService: AuthService, private router: Router){    
    }

    
    attemptLogout(){
        this.authService.logout()
            .then(() => {
                this.router.navigate(['/']);
            })
            .catch((e) => { 
                console.log(e.message);
            })
    }

}
