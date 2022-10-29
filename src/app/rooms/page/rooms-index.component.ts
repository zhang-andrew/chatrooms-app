import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from '../ui/rooms-list.component';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { DocumentData } from 'firebase/firestore';

import { generateRandom } from 'src/app/shared/utils/makeRandom';
import { RoomData } from 'src/app/shared/interfaces/room-data.interface';

@Component({
    selector: 'app-rooms-index',
    standalone: true,
    imports: [CommonModule, RoomsListComponent],
    template: `

        <div class="rooms-index">
            <p>
                rooms-index works!
            </p>
            <div class="action-btns">
                <button (click)="createNewRoom()">Create Room</button>
            </div>
            <app-rooms-list [rooms]="rooms"></app-rooms-list>
        </div>
        

    `,
    styles: [
    ]
})
export class RoomsIndexComponent implements OnInit {
    // rooms = rooms;
    // rooms: Promise<DocumentData[]> | undefined;
    rooms = [];
    constructor(private readonly roomsService: RoomsService){ 
        // this.rooms = this.roomsService.getAllRooms();
        // this.rooms = this.roomsService.getRooms();
        // this.rooms = this.roomsService.getRooms();
        // this.rooms = this.roomsService.getRoomsAndSubscribe();
        
        //save to unsubscribe variable so when this component is not rendered, unmount the subscription snapshot
        //first query snapshot returns all existing documents.
        const unsubscribe = this.roomsService.subscribeToRooms((changedRooms) => {
            this.rooms = [...this.rooms, ...changedRooms];
            console.log(this.rooms);
        });
    }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        // const unsubscribe = this.roomsService.getRoomsAndSubscribe();
    }

    // async getAllRooms(){
    //     // return await this.roomsService.getAllRooms();
    // }
    
    async createNewRoom(){
        const roomData: RoomData = {
            roomId: generateRandom(),
            roomPassword: "",
            messages: [],
            members: [],
        }
        await this.roomsService.createRoomData(roomData);
    }

}
