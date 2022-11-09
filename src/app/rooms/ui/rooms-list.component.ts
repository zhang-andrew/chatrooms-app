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
        <ion-list class="rooms-list" lines="none">
            <ion-item *ngFor="let room of rooms" class="room">
                <ion-button expand="block" fill="outline" style="width: 100%;height: 100%;" (click)="joinRoom(room.roomId)">
                    <ion-grid>
                        <ion-row class="ion-padding">
                            <ion-col>
                                <ion-text>Room#{{room.roomId}}</ion-text>
                                <ion-list *ngIf="room.members" class="ion-no-padding">
                                    Members:
                                    <span *ngFor="let member of room.members" class="ion-no-padding"> 
                                        <ion-text>
                                            {{member}},
                                            <!-- Members: {{ room.members }} -->
                                        </ion-text>
                                    </span>
                                </ion-list>
                            </ion-col>
                            <ion-col size="auto" class="ion-no-padding">
                                <ion-button class="ion-padding" color="light" (click)="deleteRoom(room.roomId)">
                                    <ion-icon size="large" name="trash-outline"></ion-icon>
                                    <!-- <ion-icon name="close-outline"></ion-icon> -->
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>

                </ion-button>
                
                
                <!-- <ion-list> -->
                
                <!-- </ion-list> -->
                <!-- <article class="room"> -->
                    <!-- <h3>
                        <a (click)="joinRoom(room.roomId)">Room#{{room.roomId}}</a> -->
                        
                    <!-- </h3> -->
                    
                <!-- </article> -->
            </ion-item>
        </ion-list>
    `,
    styles: [`
        :host{
            height: 100%;
            width: 100%;
            & > :nth-child(1){
                /* padding-top: 20%; */
            }
        }
        /* ion-content, ion-list,  */
        ion-list{
            height: 100%;
        }
        ion-item{
            background-color: transparent;
            --background-color: transparent;
            --background: transparent;
            /* --box-shadow: none; */
        }

        .room{
            outline: 1px dashed black;
            outline-offset: -1px;
            /* --background: red; */
            margin-bottom: 0.5rem;
        }
        a {
            cursor: pointer;
        }
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
    
    async deleteRoom(roomId){
        event.preventDefault();
        let d = await this.roomsService.deleteRoom(roomId);
        return d
    }
    //end methods
}
