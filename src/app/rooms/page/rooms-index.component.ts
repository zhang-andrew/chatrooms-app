import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from '../ui/rooms-list.component';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { DocumentData } from 'firebase/firestore';

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
    isFirstLoad = true;
    constructor(private readonly roomsService: RoomsService){ 
        //save to unsubscribe variable so when this component is not rendered, unmount the subscription snapshot
        //first query snapshot returns all existing documents.
        const unsubscribe = this.roomsService.subscribeToRooms((changedRooms) => {
            if (this.isFirstLoad){
                //...changedRooms returns all rooms on the first retrieval.
                const serverRooms = changedRooms.map(changedRoom => changedRoom.data)
                this.rooms = [...serverRooms];
                this.isFirstLoad = false;
            } else {
                const localRoomsIds = this.rooms.map(room => room['roomId']);
                changedRooms.forEach((changedRoom) => {
                    if (changedRoom.type == "modified"){
                        //get matching localIndex of changedRoom data by roomId
                        const localIndex = localRoomsIds.indexOf(changedRoom.data['roomId']);
                        console.log("index: "+localIndex);
                        //edit specific room in local list.
                        this.rooms[localIndex]['roomId'] = changedRoom.data['roomId'];
                        this.rooms[localIndex]['roomPassword'] = changedRoom.data['roomPassword'];
                        this.rooms[localIndex]['members'] = changedRoom.data['members'];

                    } else if (changedRoom.type == "removed"){
                        //get matching localIndex of changedRoom by roomData
                        console.log(changedRoom.data);
                        const removedIndex = localRoomsIds.indexOf(changedRoom.data['roomId']);
                        console.log("index: "+removedIndex);
                        //remove specific room from local list.
                        this.rooms.splice(removedIndex, 1);

                    } else if (changedRoom.type == "added"){
                        //append new room to local list.
                        this.rooms = [...this.rooms, changedRoom.data];
                    }

                })

            }
            
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
            // roomId: generateRandom(),
            roomPassword: "",
            // messages: [],
            members: [],
        }
        await this.roomsService.createRoom(roomData);
    }

}
