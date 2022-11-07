import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { UsersService } from './shared/services/users.service';
// import { AuthService } from './services/auth.service';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SingletonService } from './shared/services/singleton.service';

@Component({
    selector: 'app-root',
    // templateUrl: './app.component.html',
    // styleUrls: ['./app.component.scss'],
    template: `
        <!-- MENU -->
        <ion-menu class="side-menu" contentId="main-content" type="overlay" side="end">
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
                        <ion-button expand="block" fill="clear" (click)="navigateTo('/rooms')">
                            <span>
                                <ion-icon slot="icon-only" name="chatbubbles-outline"></ion-icon>
                                <div slot="start">Rooms</div>
                            </span>
                        </ion-button>
                    </ion-item>
                    <ion-item>
                        <ion-button expand="block" fill="clear" (click)="navigateTo('/users')">
                            <span>
                                <ion-icon slot="icon-only" name="person-circle-outline"></ion-icon>
                                <div slot="start">Profile</div>
                            </span>
                        </ion-button>
                    </ion-item>
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

        <!-- HEADER -->
        <ion-header class="ion-no-border">
            <ion-grid>
                <ion-row class="ion-justify-content-between ion-align-items-center ion-padding">
                    <ion-col size="auto">
                        <!-- <a href="/"> -->
                            <ion-button class="logo-button" (click)="navigateTo('/rooms')">
                                <ion-icon name="people-circle-outline"></ion-icon>
                                Chatrooms
                            </ion-button>        
                        <!-- </a> -->
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

        <!--  -->
        <!-- ROUTER -->
        <!--  -->
        <!-- <router-outlet id="main-content"></router-outlet> -->
        <ion-router-outlet id="main-content" ></ion-router-outlet>

        <!-- MODAL: createDisplayName  -->
        <ng-container *ngIf="showModalCreateDisplayName == true">
            <div class="display-name__modal">
                <ion-card class="display-name__card">
                
                    <form [formGroup]="displayNameForm" (ngSubmit)="createDisplayNameOnSubmit()" (keydown.enter)="createDisplayNameOnSubmit()">
                        <ion-title>Create a display name</ion-title>
                        <ion-list>
                            <ion-item>
                                <ion-input placeholder="John Doe..." formControlName="displayName" required></ion-input>
                            </ion-item>
                            <div class="az-validation-errors" *ngIf="displayNameInput?.hasError('required')">
                                <ion-text color="danger">Cannot be empty.</ion-text>
                            </div>
                        </ion-list>
                        
                        <ion-button role="button" type="submit" color="tertiary">Create</ion-button>
                    </form>
                    
                </ion-card>
            </div>
        </ng-container>
        <ng-container *ngIf="this.singletonService.props.showSpinner == true">
            <div class="spinner">
                <ion-grid>
                    <ion-row class="ion-justify-content-center">
                        <ion-spinner name="crescent"></ion-spinner>
                    </ion-row>
                </ion-grid>
            </div>
        </ng-container>
        
        <!-- <div>Toast Notifications</div> -->
    `,
    styles: [`
        :host{}
        ion-header{
            /* outline: 1px dashed rgba(5,5,5,0.2);
            outline-offset: -1px; */
            background-color: gainsboro;
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


        .display-name{
            &__modal{
                position: absolute;
                /* inset: 0; */
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                width: 50%;
                height: 50%;
                background-color: white;
                border-radius: 5px;
                z-index: 999;
            }
            &__card{
                height: 100%;

                form{
                    padding: 1rem;
                    height: 100%;
                }
            }
        }
        .spinner {
            position: absolute !important;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            /* display: none; */
            /* &.active{
                display: block;
            } */
        }
    `]
})
export class AppComponent {
    title = 'chatrooms';
    sideMenu;

    // showSpinner = this.singletonService.props.showSpinner;
    showModalCreateDisplayName = false;
    displayNameForm: FormGroup;

    constructor(private authService: AuthService, private router: Router, private usersService: UsersService,
        private readonly formBuilder: FormBuilder,
        public singletonService: SingletonService){    
        // console.log(this.showSpinner);
            
    }

    get displayNameInput(){
        return this.displayNameForm.get('display-name');   
    }

    ngOnInit(): void {
        //assign variable
        this.sideMenu = document.querySelector(".side-menu");
        //create form
        this.displayNameForm = this.formBuilder.group({
            "displayName": ['', [Validators.required]]
        })

        //router navigation subscription
        this.router.events.subscribe( async(event) => {
            // event instanceof NavigationStart
            if (event instanceof NavigationEnd){
                console.log(event.url)
                console.log(this.authService.currentUser);


                
                if (event.url == "/"){
                    this.showModalCreateDisplayName = false;

                } else if (event.url == "/rooms" || event.url.startsWith('/rooms')){
                    //disable all pages - //reset disabled status
                    const pageElements = document.querySelectorAll('.page');
                    pageElements.forEach((page) => {
                        page.classList.add("disabled");
                        console.log(page.classList);
                    })

                    const dbUser = await this.usersService.getUser(this.authService.currentUser.uid);

                    if (dbUser['displayName'] != null){
                        console.log("Found valid displayName");
                        //enable pages
                        pageElements.forEach((page) => {
                            page.classList.remove("disabled");
                            console.log(page.classList);
                        })
                        this.authService.currentUser.displayName = dbUser['displayName'];
                    } else {
                        console.log("DisplayName not valid: "+JSON.stringify(this.authService.currentUser));
                        this.showModalCreateDisplayName = true;
                    }
                } else if (event.url == "/users"){
                    console.log("PROFILE /users");
                }


                //if rooms.id
                    //scroll down to bottom of messageList

            //    this.routerChangeMethod(event.url);
            }
         })
    }
    
    attemptLogout(){
        //start spinner
        this.singletonService.props.showSpinner = true;

        this.authService.logout()
            .then(() => {
                this.router.navigate(['/']);
                //hide menu
                this.sideMenu.close();
                try {
                    document.querySelector(".wrapper").classList.remove("disabled");
                    document.querySelector(".spinner").classList.remove("active");    
                } catch (error) {
                }
                //enable pages again
                const pageElements = document.querySelectorAll('.page');
                pageElements.forEach((page) => {
                    page.classList.remove("disabled");
                    console.log(page.classList);
                })
                //hide spinner
                this.singletonService.props.showSpinner = false;
                
            })
            .catch((e) => { 
                console.error(e.message);
            })
    }
    navigateTo(path){
        //show spinner

        //navigate
        this.router.navigate([path]).then(()=>{
            console.log("LOADED!");
            // this.showSpinner = false;
        })

        //hide menu
        this.sideMenu.close();
        try {
            document.querySelector(".wrapper").classList.remove("disabled");
            document.querySelector(".spinner").classList.remove("active");            
        } catch (error) {
        }
    }




    async createDisplayNameOnSubmit(){
        const formValues = this.displayNameForm.value; //returns an object containing form values
        if (formValues.displayName == ""){
            console.log('error... inputValue is: ""');
            return
        }
        const changedFields = {
            "uid": this.authService.currentUser.uid,
            "displayName": formValues.displayName
        }
    
        //update server dbUser
        await this.usersService.updateUser(changedFields);
        console.log("created a display name");
        //update local authUser
        this.authService.currentUser.displayName = formValues.displayName;
        
        this.singletonService.props.showSpinner = false;
        this.showModalCreateDisplayName = false;
        document.querySelectorAll('.page').forEach((page)=>{
            page.classList.remove('disabled');
        })
    }
}
