import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomData } from 'src/app/shared/interfaces/room-data.interface';
import { Observable } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import { RouterModule } from '@angular/router';
// import { Router, RouterLink } from '@angular/router';

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
                    <a [routerLink]="[room.roomId]" >{{room.roomId}}</a>
                </h3>
                <p *ngIf="room.members">Members: {{ room.members }}</p>
            </article>

        </div>
    </div>
  `,
    styles: [`
        .room{
            outline: 1px dashed black;
            outline-offset: -1px;
        }
    `]
})
export class RoomsListComponent implements OnInit {
    // @Input() rooms: any[] | undefined;
    @Input() rooms;
    constructor() {}

    ngOnInit(): void {
    }
    

}
