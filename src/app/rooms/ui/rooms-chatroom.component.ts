import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-rooms-chatroom',
    standalone: true,
    imports: [CommonModule],
    template: `
        <p>
            rooms-chatroom works!
        </p>
    `,
    styles: [
    ]
})
export class RoomsChatroomComponent implements OnInit {
    // items: FirebaseListObservable<any>;
    // items: ListObs
    // name: any;
    // msgVal: string = '';

    // The items property is set to the FirebaseListObservable. This helps fetch the messages from Firebase.
    // The name property is something we'll set to check if the auth is successful.
    // msgVal we're using for property binding, which will allow us to clear the text input field after a user hits Enter to submit a new chat message.
    constructor(){
        // fetchChat()
    }

    ngOnInit(): void{
    }

    

}
