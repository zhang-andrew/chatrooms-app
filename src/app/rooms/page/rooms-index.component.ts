import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from '../ui/rooms-list.component';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { DocumentData } from 'firebase/firestore';

import { RoomData } from 'src/app/shared/interfaces/room-data.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UpdatedUserData, UserData } from 'src/app/shared/interfaces/user-data.interface';
import { Auth } from '@angular/fire/auth';

import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-rooms-index',
    standalone: true,
    imports: [CommonModule, RoomsListComponent, IonicModule],
    template: `
        <div class="page disabled">
            <ion-content>
                <!-- <ion-list lines="none"> -->
                <ion-item lines="none">
                    <div class="action-btn-container">
                        <ion-button (click)="createNewRoom()"> Create Room</ion-button>
                    </div>
                </ion-item>
                <!-- <ion-item> -->
                <app-rooms-list [rooms]="rooms"></app-rooms-list>
                <!-- </ion-item> -->
                <!-- </ion-list> -->
            </ion-content>
        </div>
    `,
    styles: [`
        :host{
            & > :nth-child(1){
                height: 100%;
                width: 100%;
                /* background-color: red; */
                position: relative;
                padding: 1rem;
                padding-top: 5rem;
                
            }
        }
        /* .rooms-index{
            height: 100%;
        } */
        .disabled {
            pointer-events: none;
            opacity: 0.4;
        }
        ion-content, ion-list, ion-item{
            background-color: transparent;
            --background-color: transparent;
            --background: transparent;
        }
        .action-btn-container{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    `]
})
export class RoomsIndexComponent implements OnInit {
    rooms = [];
    isFirstLoad = true;
    // showModalCreateDisplayName = false;
    // displayNameForm: FormGroup;
    constructor(private readonly roomsService: RoomsService,){ 
    }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
    }

    ngOnDestroy(): void {   
    }

    ngAfterViewInit(): void {   
        //Deals with room changes for the rooms list.
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
                });
            };

        });
    }

    
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



    // private checkForDisplayName(){
    //     console.log("checkForDisplayName ran.");
            
    // }
        


    // private changeDisplayNameExample(){
    //     const input = (<HTMLInputElement>document.querySelector('.input-display-name')).value;
    //     console.log(input);
    // }


