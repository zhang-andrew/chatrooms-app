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
        <ion-app>
            <!-- MENU -->
            <ion-menu class="side-menu" contentId="main-content" type="overlay" side="end">
                <ion-header class="ion-no-border">
                    <ion-menu-toggle>
                        <ion-button class="x-button ion-padding" color="light" >
                            <span>
                                <ion-icon slot="icon-only" name="close-outline"></ion-icon>
                            </span>
                        </ion-button>
                    </ion-menu-toggle>
                </ion-header>
                <ion-content class="ion-padding side-menu-content">
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
            <ion-header class="ion-no-border" [ngStyle]="{'visibility': this.showHeader ? 'visible' : 'hidden'}">
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
                            <ion-toolbar *ngIf="this.authService.isLoggedIn">
                                <ion-buttons slot="start">
                                    <!-- <ion-menu-button auto-hide="false"></ion-menu-button> -->
                                    <ion-menu-button auto-hide="false"></ion-menu-button>
                                </ion-buttons>
                            </ion-toolbar> 
                            <ion-toolbar [ngStyle]="styleObject()">
                                <ion-button class="menu-button-login" fill="clear" (click)="navigateTo('/login')">Log in</ion-button>
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
                        <ion-header class="ion-no-border ion-padding">
                            <ion-title>Create a display name</ion-title>
                        </ion-header>
                        
                        <form [formGroup]="displayNameForm" (ngSubmit)="createDisplayNameOnSubmit()" (keydown.enter)="createDisplayNameOnSubmit()">
                            <!-- <ion-content> -->
                            <!-- <div class=""> -->
                                <ion-list>
                                    <ion-item>
                                        <ion-input maxlength="20" placeholder="John Doe..." formControlName="displayName" required></ion-input>
                                        
                                    </ion-item>
                                    <!-- <div class="az-validation-errors" *ngIf="displayNameInput?.hasError('required')">
                                        <ion-text color="danger">Cannot be empty.</ion-text>
                                    </div> -->
                                </ion-list>

                                <div class="ion-float-right">
                                    <ion-button role="button" type="submit" color="tertiary">Create</ion-button>    
                                </div>
                            <!-- </div> -->
                                
                            <!-- </ion-content>                         -->
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

        </ion-app>
        
        
        <!-- <div>Toast Notifications</div> -->
    `,
    styles: [`
        :host{
            position: relative;
        }
        ion-header, .side-menu-content{
            /* outline: 1px dashed rgba(5,5,5,0.2);
            outline-offset: -1px; */
            background-color: gainsboro;
            background-color: rgb(246, 249, 254);
            --background: rgb(246, 249, 254);
            
        }
        .side-menu-content{
            ion-list{
                --background: transparent;
                --ion-background-color: transparent;
            }
            ion-item{
                --background: transparent;
                --background-color: transparent;
            }
            ion-button{
                --background: transparent;
                --background-color: transparent;
                
            }
            ion-button{
                height: 100%;
                width: 100%;
                --box-shadow: none;
                span{
                    /* text-align:left; */
                    width:100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }
            }
        }
        ion-toolbar{
            --background: transparent;
        }
        .logo-button{
            --box-shadow: none;
            --background: transparent;
            --background-activated: white;
            --background-activated-opacity: 0.7;
            --color-activated: blue;
            --color: black;
            ion-icon{
                padding-right: 0.3rem;
            }
        }
        .menu-button-login{
            padding: 0;
            --padding-top: 16px;
            --padding-bottom: 16px;
        }
        .x-button{
            /* --box-shadow: none; */
            /* --background: transparent; */
            /* --color: black; */
            height: 100%;
            --box-shadow: none;
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
                /* height: 100vh;
                width: 100vw; */
                top: 50%;
                left: 50%;
                width: 80%;
                /* height: 50%; */
                transform: translateX(-50%) translateY(-50%);
                
                /* background-color: white; */
                /* outline: 1px dashed red;
                outline-offset: -1px; */
                border-radius: 5px;
                z-index: 999;
                
            }
            &__card{
                /* min-height: 30%; */
                
                margin-left: auto;
                margin-right: auto;
                width: 80%;
                height: 200px;
                padding: 1rem;
                /* transform: translateY(50%); */
                ion-header{
                    background-color: white;
                }
                form{
                    /* padding: 1rem; */
                    /* height: 100%; */
                    /* display: flex;
                    flex-direction: column;
                    justify-content: space-between; */
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
    showHeader = true;
    showModalCreateDisplayName = false;
    displayNameForm: FormGroup;

    constructor(public authService: AuthService, private router: Router, private usersService: UsersService,
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

                //reset header
                this.showHeader = true;

                if (event.url == "/"){
                    this.showModalCreateDisplayName = false;
                    
                } else if (event.url == "/login") {
                    //hide header for login page
                    this.showHeader = false;
                } else if (event.url == "/rooms" || event.url.startsWith('/rooms')){
                    //disable all pages - //reset disabled status
                    this.disablePages();
                    // const pageElements = document.querySelectorAll('.page');
                    // pageElements.forEach((page) => {
                    //     page.classList.add("disabled");
                    //     console.log(page.classList);
                    // })

                    const dbUser = await this.usersService.getUser(this.authService.currentUser.uid);

                    if (dbUser['displayName'] != null){
                        console.log("Found valid displayName");
                        //enable pages
                        this.enablePages();
                        // pageElements.forEach((page) => {
                        //     page.classList.remove("disabled");
                        //     console.log(page.classList);
                        // })
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
        // this.singletonService.props.showSpinner = true;
        this.disablePages();

        //hide menu
        this.sideMenu.close();

        this.authService.logout()
            .then(() => {
                this.router.navigate(['/']);

                this.enablePages();
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


    styleObject(): Object {
        if (this.authService.isLoggedIn){
            return {display: "none"}
        } else if (this.authService.isLoggedIn == false){
            return {display: "block"}
        } else {
            return {visibility: "hidden", display: "block"}
        }
        
        // if (/** YOUR CONDITION TO SHOW THE STYLES*/  ){
        //     return {height: this.height,width: this.width}
        // }
        return {}
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


