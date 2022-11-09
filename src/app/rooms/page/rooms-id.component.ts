import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { RoomsChatroomComponent } from '../ui/rooms-chatroom.component';

import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-rooms-id',
    standalone: true,
    imports: [CommonModule, IonicModule, RoomsChatroomComponent],
    template: `
        <div class="page disabled">
            <app-rooms-chatroom [roomId]="roomId"></app-rooms-chatroom>
        </div>
    `,
    styles: [`
        :host{
            & > :nth-child(1){
                height: 100%;
                width: 100%;
                /* background-color: red; */
                position: relative;
                /* padding: 1rem; */
                padding-top: 5rem;
            }
        }
        .disabled {
            pointer-events: none;
            opacity: 0.4;
        }

    `]
})
export class RoomsIdComponent implements OnInit {
    roomId = "";

    constructor(private route: ActivatedRoute, private roomsService: RoomsService) { }

    ngOnInit(): void {
        // First get the product id from the current route
        const routeParams = this.route.snapshot.paramMap;
        console.log(routeParams);
        const roomIdFromRoute = String(routeParams.get('roomId'));
        console.log(roomIdFromRoute);
        this.roomId = roomIdFromRoute;
        

        // // Find the product that corresponds with the id provided in route.
        // this.product = products.find(
        //     (product) => product.id === productIdFromRoute
        // );
    }

}
