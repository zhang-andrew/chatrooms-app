import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from '../ui/rooms-list.component';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { DocumentData } from 'firebase/firestore';

@Component({
    selector: 'app-rooms-index',
    standalone: true,
    imports: [CommonModule, RoomsListComponent],
    template: `
        <div class="rooms-index">
            <p>
                rooms-index works!
            </p>
            <app-rooms-list [rooms]="rooms"></app-rooms-list>
        </div>
        

    `,
    styles: [
    ]
})
export class RoomsIndexComponent implements OnInit {
    // rooms = rooms;
    rooms: Promise<DocumentData[]> | undefined;
    constructor(private readonly roomsService: RoomsService){ 
        this.rooms = this.roomsService.getAllRooms();
    }

    ngOnInit(): void {
    }


    async getAllRooms(){
        // return await this.roomsService.getAllRooms();
    }
}
