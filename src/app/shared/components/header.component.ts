import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, IonicModule],
    template: `
        <!-- <p>
            header works!
        </p>
        <div> -->
        <ion-menu contentId="main-content">
            <ion-header>
                <ion-toolbar>
                    <ion-title>Menu Content</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">This is the menu content.</ion-content>
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
        <!-- </div> -->
    `,
    styles: [`
        :host{
        }
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

    `]
})
export class HeaderComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
