import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, IonicModule],
    template: `
        <div>
            <ion-nav>
                
            </ion-nav>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Tab</ion-title>
                </ion-toolbar>
            </ion-header>
        </div>

    `,
    styles: [
    ]
})
export class HeaderComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
