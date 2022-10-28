import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomData } from 'src/app/shared/interfaces/room-data.interface';
import { Observable } from 'rxjs';
import { DocumentData } from 'firebase/firestore';

@Component({
    selector: 'app-rooms-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="rooms-list">
        <p>
            rooms-list works!
            List of rooms:
        </p>
        <div *ngFor="let room of rooms | async">
            <article class="room">
                <h3>
                    <!-- <a
                    [routerLink]="['products', product.id]"
                    [title]="product.name + ' details'"
                    > -->
                    <a href="">{{room.roomId}}</a>
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
    @Input() rooms: Promise<any[]>;
    constructor() {}

    ngOnInit(): void {
    }

}
