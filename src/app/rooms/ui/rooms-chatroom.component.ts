import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { MessageData } from 'src/app/shared/interfaces/message-data.interface';
import { generateRandom } from 'src/app/shared/utils/makeRandom';
// import { AuthService } from 'src/app/shared/services/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
    selector: 'app-rooms-chatroom',
    standalone: true,
    imports: [CommonModule],
    template: `
        <p>
            rooms-chatroom works!
        </p>
        <!-- <div *ngFor="let message of messages | async"> -->
        <div *ngFor="let message of messages">
            <pre>
                by user: {{ message.userId | json }} 
                message: {{ message.text | json }}
                timestamp: {{ message.createdAt }} 
            </pre>
        </div>

        <input type="text" (keydown.enter)="sendChat($event)">
    `,
    styles: [`
        input{
            background-color: rgba(0, 0, 0, 0.1);
        }
    `]
})
export class RoomsChatroomComponent implements OnInit {
    // items: FirebaseListObservable<any>;
    // items: ListObs
    // name: any;
    // msgVal: string = '';

    // The items property is set to the FirebaseListObservable. This helps fetch the messages from Firebase.
    // The name property is something we'll set to check if the auth is successful.
    // msgVal we're using for property binding, which will allow us to clear the text input field after a user hits Enter to submit a new chat message.
    @Input() roomId: string;
    // messages;
    messages = [];
    constructor(private readonly roomsService: RoomsService, private readonly auth: Auth,){

        
    }

    ngOnInit(): void{
        //Input properties isn't initialized until view is set up so generally you can access input value on ngOnInit()
        console.log("room messages: "+this.roomId);
        console.log(this.roomsService.getMessagesByRoomId(this.roomId));
        // this.messages = this.roomsService.getRoomMessages(this.roomId);
        const unsubscribe = this.roomsService.subscribeToRoomMessages(this.roomId, (newMessages) => {
            // console.log()
            this.messages = [...this.messages, ...newMessages];
            // return newMessages
        })
        
    }

    async sendChat(event){
        console.log("sent message: "+ event.target.value);
        //save
        const message: MessageData = {
            messageId: generateRandom(),
            userId: this.auth.currentUser.uid,
            // createdAt: "",
            text: event.target.value,
            roomId: this.roomId
        }
        // this.roomsService.createNewMessage(this.roomId, message);
        await this.roomsService.createMessage(message);

        //reset input
        event.target.value = "";
    }

    

}
