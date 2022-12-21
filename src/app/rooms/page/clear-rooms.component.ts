import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ActivatedRoute } from '@angular/router';
import { RoomsService } from 'src/app/shared/services/rooms.service';
// import { RoomsChatroomComponent } from '../ui/rooms-chatroom.component';
import { IonicModule } from '@ionic/angular';


// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-clear-rooms',
    standalone: true,
    imports: [CommonModule, IonicModule],
    template: `
        <div class="page disabled">
            <br>
            Hello... clearing rooms.
            <!-- <app-rooms-chatroom [roomId]="roomId"></app-rooms-chatroom> -->
        </div>
    `,
    styles: [`
        :host{
            & > :nth-child(1){
                height: 100%;
                width: 100%;
                /* background-color: red; */
                position: relative;
                /* padding: 1rem; */
                padding-top: 5rem;
            }
        }
        .disabled {
            pointer-events: none;
            opacity: 0.4;
        }

    `]
})
export class ClearRoomsComponent implements OnInit {
    // roomId = "";

    constructor(private roomsService: RoomsService, private http: HttpClient) { }

    ngOnInit(): void {
        // First get the product id from the current route
        // const routeParams = this.route.snapshot.paramMap;
        // console.log(routeParams);
        // const roomIdFromRoute = String(routeParams.get('roomId'));
        // console.log(roomIdFromRoute);
        // this.roomId = roomIdFromRoute;
        

        // // Find the product that corresponds with the id provided in route.
        // this.product = products.find(
        //     (product) => product.id === productIdFromRoute
        // );
        // this.http.get('/clear-rooms').subscribe(data => {
        // do something with the data returned from the server
        console.log("hi this worked");
        this.deleteRooms();
        //   });
    }


    async deleteRooms(){
        // e.preventDefault();
        //stop event bubbling from triggering parent's joinRoom click event
        // e.stopPropagation();
        // let d = 
        // await this.roomsService.deleteRoom(roomId);
        await this.roomsService.deleteRooms();
        // return d
    }

    // deleteSomething() {
    //     this.http.delete('/api/something')
    //       .subscribe(
    //         data => {
    //           console.log(data);
    //         },
    //         error => {
    //           console.error(error);
    //         }
    //       );
    //   }

}
