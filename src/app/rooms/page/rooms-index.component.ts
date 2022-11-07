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


@Component({
    selector: 'app-rooms-index',
    standalone: true,
    imports: [CommonModule, RoomsListComponent],
    template: `
        <div>
            <div class="rooms-index disabled">
                <p>
                    rooms-index works!
                </p>
                <div class="action-btns">
                    <button (click)="createNewRoom()">Create Room</button>
                </div>
                <app-rooms-list [rooms]="rooms"></app-rooms-list>
            </div>

            <ng-container *ngIf="showModalCreateDisplayName == true">
                <div class="modal-create-display-name">
                    Create a display name
                    <input class="input-display-name" type="text">
                    <!-- <input class="input-display-name" type="text" (input)="changeDisplayNameExample()"> -->
                    <button (click)="createDisplayName($event)">Create</button>
                </div>
            </ng-container>
        </div>
    `,
    styles: [`
        :host{
            & > :nth-child(1){
                height: 100%;
                width: 100%;
                /* background-color: red; */
                position: relative;
                padding-top: 20%;
            }
        }
        .disabled {
            pointer-events: none;
            opacity: 0.4;
        }
        .modal-create-display-name{
            position: absolute;
            /* inset: 0; */
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: 50%;
            height: 50%;
            background-color: white;
            outline: 1px solid black;
            outline-offset: -1px;
            margin: 1rem;
            padding: 1rem;
        }
    `]
})
export class RoomsIndexComponent implements OnInit {
    rooms = [];
    isFirstLoad = true;
    showModalCreateDisplayName = false;
    constructor(private readonly roomsService: RoomsService, 
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly auth: Auth){ 
        // console.log("CONSTRUCTOR()");

        
    }

    async ngOnInit() {
        // if userData has displayName
        const userData = await this.usersService.getUser(this.auth.currentUser.uid);
        if (userData['displayName'] != null){
            console.log("Found valid displayName");
            this.enablePage();
        } else {
            console.log("DisplayName not valid: "+JSON.stringify(this.authService.currentUser));
            this.showModalCreateDisplayName = true;
        }        
    }
    ngAfterViewInit() {   
        // console.log("NG AFTER VIEW INIT");



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

    ngOnChanges(): void {
        // const unsubscribe = this.roomsService.getRoomsAndSubscribe();
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



    async createDisplayName(event){
        event.preventDefault();
        const inputValue = (<HTMLInputElement>document.querySelector('.input-display-name')).value;
        if (inputValue == ""){
            console.log("error... inputValue is: "+ inputValue);
            return
        }

        // let d = input.value
        const changedFields = {
            "uid": this.authService.currentUser.uid,
            "displayName": String(inputValue)
        }
        //update server dbUser
        await this.usersService.updateUser(changedFields);
        console.log("created a display name: "+inputValue);
        //update local authUser
        this.authService.currentUser.displayName = inputValue;
        
        this.showModalCreateDisplayName = false;
        this.enablePage();
        
    }




    private enablePage() {
        document.querySelector('.rooms-index').classList.remove("disabled");
    }
    // private checkForDisplayName(){
    //     console.log("checkForDisplayName ran.");
        
        
    // }
        


    // private changeDisplayNameExample(){
    //     const input = (<HTMLInputElement>document.querySelector('.input-display-name')).value;
    //     console.log(input);
    // }

}
