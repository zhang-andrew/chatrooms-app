import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomData } from 'src/app/shared/interfaces/room-data.interface';
import { Observable } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import { RouterModule } from '@angular/router';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';

import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-rooms-list',
    standalone: true,
    imports: [CommonModule, RouterModule, IonicModule],
    template: `
        <div class="rooms-list" lines="none">
            <ion-grid>
                <ion-row class="ion-justify-content-start ion-align-items-start">
                    
                    <ion-col size="6" size-md="4" *ngFor="let room of rooms" class="room-container">
                        <ion-button expand="full" (click)="joinRoom(room.roomId)" class="room">

                            <ion-text class="room__name">Room #{{room.roomId.slice(0, 4)}}</ion-text>

                            <!-- <div class="room__delete-btn-container"> -->
                            <ion-button class="room__delete-btn" fill="clear" color="light" (click)="deleteRoom($event, room.roomId)">
                                <!-- <ion-icon name="close-outline"></ion-icon> -->
                                <ion-icon name="trash-outline" style="color:black;"></ion-icon>
                            </ion-button>
                            <!-- </div> -->
                           

                            <ion-item class="room__members ion-no-padding" lines="none">
                                <ion-text class="ion-text-wrap">
                                    <ion-icon name="ellipse-outline" style="vertical-align: bottom; padding-left: 0.5rem"></ion-icon>
                                    Members:&#160; 
                                    <span *ngFor="let member of room.members" > 
                                        <span *ngIf="room.members.length > 2 && member != room.members[room.members.length - 1]">
                                            {{member}},&#160;
                                        </span>
                                        <span *ngIf="member == room.members[room.members.length - 1]">
                                            {{member}}
                                        </span>
                                    </span>
                                </ion-text>
                            </ion-item>

                        </ion-button>
                    </ion-col>

                    <ion-col size="6" size-md="4" class="room-container">
                        <ion-button expand="full" (click)="createNewRoom()" class="room">
                            <ion-icon size="large" name="add-outline"></ion-icon>
                        </ion-button>
                    </ion-col>

                </ion-row>
            </ion-grid>
        </div>
    `,
    styles: [`
        :host{
            height: 100%;
            width: 100%;
            & > :nth-child(1){
                /* padding-top: 20%; */
            }
        }
        p > span{
            display: inline-block;
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
            background: none;
            background-color: transparent;
            --background: none;
            --box-shadow: none;
            --inner-box-shadow: none;
            
            > * {
                --border-bottom: none;
                border-bottom: none;    
            }
            box-shadow: none;
        }

        /* ion-col */
        .room-container{
            text-align: center;
            padding: 0.3rem;
        }
        /* ion-button */
        .room{ 
            --padding-top: 0px;
            --padding-start: 0px;
            --padding-end: 0px;
            --padding-bottom: 0px;
            --inner-padding-end: 0px;
            --inner-padding-start: 0px;
            --inner-padding-top: 0px;
            --inner-padding-bottom: 0px;

            --box-shadow: none;
            --background: transparent;
            --background-activated: white;
            --background-activated-opacity: 0.7;
            --background-hover: blue;
            --color-activated: blue;
            --color: black;

            height: 10rem;
            width: 100%;
            position: relative;
            background-color: rgb(236, 239, 254);
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
                
            &__name{
                position: absolute;
                top: 1rem;
                left: 50%;
                transform: translateX(-50%);
                text-transform: uppercase;
            }
            
            &__delete-btn-container{
            }
            &__delete-btn{
                @media (orientation: "portrait"){
                    visibility: visible;
                }
                visibility: hidden;
                position: absolute;
                bottom: 0;
                right: 0;
                
                /* ion-icon{ */
                    /* position: relative;
                    z-index: 999 !important; */
                    /* outline: 1px solid red; */
                /* } */
                

                /* --background-activated: white;
                --background-activated-opacity: 0.7; */
                /* --background: transparent;
                --background-activated: white;
                --background-activated-opacity: 0.7;
                --background-hover: red;
                --color-activated: blue;
                --color: black;
                color: black !important;
                background-color: transparent;
                color: black; */

            }
            &__members{
                position: absolute;
                top: 2rem;
                left: 0.5rem;

                font-size: 12px;
                opacity: 0.65;

                span{
                    padding: 0;
                    margin: 0;
                }
            }


            &:hover{
                > *{
                    visibility: visible;
                }    
            }
        }


        .card-add-btn{
            height: 10rem;
            width: 100%;
            background-color: rgb(236, 239, 254);
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
            margin: 0.3rem;
        }


        /* ion-content, ion-list,  */
        /* ion-list{
            height: 100%;
        }
        ion-item{
            background-color: transparent;
            --background-color: transparent;
            --background: transparent;
            --box-shadow: none;
        }

        .room{
            outline: 1px dashed black;
            outline-offset: -1px;
            
            margin-bottom: 0.5rem;
        }
        a {
            cursor: pointer;
        } */
        /* .btn-del-room{
            --padding: 8px;
        } */
    `]
})
export class RoomsListComponent implements OnInit {
    // @Input() rooms: any[] | undefined;
    @Input() rooms;
    
    constructor(
        private readonly roomsService: RoomsService, 
        private readonly auth: Auth, 
        private readonly router:Router,
        private readonly usersService: UsersService,) {}

    ngOnInit(): void {
    }
    
    async joinRoom(roomId){
        event.preventDefault();
        //navigate to room
        this.router.navigate(['/rooms', roomId]);
        

        //update rooms.members
        const userData = await this.usersService.getUser(this.auth.currentUser.uid);
        const displayName = userData.displayName;

        const roomData = await this.roomsService.getRoom(roomId);
        const existingMembers = roomData['members'];
        const updatedMembers = [...existingMembers, displayName];
        if (![...roomData['members']].includes(displayName)){
            const updatedRoomData: RoomData = {
                roomId: roomData['roomId'],
                roomPassword: roomData['roomPassword'],
                members: updatedMembers,
            }
            //update members list
            this.roomsService.updateRoom(updatedRoomData);
        } 
    }
    
    async deleteRoom(e, roomId){
        e.preventDefault();
        //stop event bubbling from triggering parent's joinRoom click event
        e.stopPropagation();
        // let d = 
        await this.roomsService.deleteRoom(roomId);
        // return d

        
    }
    async addRoom(){
        console.log("add room");
        
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
    //end methods
}
