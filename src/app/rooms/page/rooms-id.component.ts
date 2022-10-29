import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { RoomsChatroomComponent } from '../ui/rooms-chatroom.component';

@Component({
    selector: 'app-rooms-id',
    standalone: true,
    imports: [CommonModule, RoomsChatroomComponent],
    template: `
        <p>
            rooms-id works!
        </p>
        <app-rooms-chatroom></app-rooms-chatroom>
    `,
    styles: [
    ]
})
export class RoomsIdComponent implements OnInit {
    constructor(private route: ActivatedRoute, private roomsService: RoomsService) { }

    ngOnInit(): void {
        // First get the product id from the current route
        const routeParams = this.route.snapshot.paramMap;
        console.log(routeParams);
        const roomIdFromRoute = String(routeParams.get('roomId'));
        console.log(roomIdFromRoute);

        // // Find the product that corresponds with the id provided in route.
        // this.product = products.find(
        //     (product) => product.id === productIdFromRoute
        // );
    }

}
