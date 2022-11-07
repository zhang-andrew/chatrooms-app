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

@Component({
    selector: 'app-rooms-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="rooms-list">
        <p>
            rooms-list works!
            List of rooms:
        </p>
        <!-- <div *ngFor="let room of rooms | async"> -->
        <div *ngFor="let room of rooms">
            <article class="room">
                <h3>
                    <!-- <a
                    [routerLink]="['products', product.id]"
                    [title]="product.name + ' details'"
                    > -->
                    <!-- <a [routerLink]="[room.roomId]">{{room.roomId}}</a> -->
                    <a (click)="joinRoom(room.roomId)">{{room.roomId}}</a>
                    <button (click)="deleteRoom(room.roomId)">Delete</button>
                </h3>
                <p *ngIf="room.members">Members: {{ room.members }}</p>
            </article>

        </div>
    </div>
  `,
    styles: [`
        :host{
            & > :nth-child(1){
                /* padding-top: 20%; */
            }
        }
        .room{
            outline: 1px dashed black;
            outline-offset: -1px;
        }
        a {
            cursor: pointer;
        }
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
