import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { MessageData } from 'src/app/shared/interfaces/message-data.interface';

// import { AuthService } from 'src/app/shared/services/auth.service';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/shared/services/auth.service';

import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-rooms-chatroom',
    standalone: true,
    imports: [CommonModule, IonicModule],
    template: `
        <ion-card>
            <!-- <ion-grid>
                <ion-row> -->
                    <!-- <ion-col> -->
                        <ion-list class="message-container">
                            <ion-item class="message ion-no-padding ion-no-margin" *ngFor="let message of messages">
                                <ion-text class="ion-text-wrap">
                                    <span>{{ message.userId | json }} :</span>
                                    <ion-text class="message-text">
                                        {{ message.text | json }}
                                    </ion-text>
                                </ion-text>
                            </ion-item>
                        </ion-list>
                        <input id="message-bar" type="text" (keydown.enter)="sendChat($event)">
                    <!-- </ion-col> -->
                <!-- </ion-row>
            </ion-grid> -->

            <!-- <div class="scroll-container"> -->
                
            <!-- </div> -->
            
            
            <!-- <div class="message-container">
                <div class="message" *ngFor="let message of messages">
                    <pre>
                        user: {{ message.userId | json }}
                        message: {{ message.text | json }}
                        timestamp: {{ message.createdAt }} 
                    </pre>
                </div>
            </div> -->
            
        </ion-card>
    `,
    styles: [`
        :host{
            > :nth-child(1) {
                padding: 0.7rem;
                /* max-height: 100%; */
                height: 50vh;
                overflow-y: hidden;
            }
        }
        ion-list.message-container{
            /* max-height: 100%; */
            /* min-height: 100vh; */
            /* min-height: 100%; */
            height: 50%;
            overflow-y: scroll;
            overflow-x: hidden;

            padding: 0;
            padding-bottom: 0.2rem;
            
            /* display: flex;
            flex-direction: column;
            justify-content: end; */
        }
        ion-item.message{
            --padding-top: 0px;
            --padding-start: 0px;
            --padding-end: 0px;
            --padding-bottom: 0px;
            --inner-padding-end: 0px;
            --inner-padding-start: 0px;
            --inner-padding-top: 0px;
            --inner-padding-bottom: 0px;
            
            /* --ripple-color: transparent; */
            --border-color: transparent;

            --min-height: 0px;

            & .message-text{
                padding-left: 0.5ch;
                /* padding-right: 0.3rem; */
                box-decoration-break: clone;
            }
        }


        #message-bar{
            /* position: absolute;
            bottom: 0; */
            width: 100%;
        }
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
    isFirstLoad = true;
    constructor(private readonly roomsService: RoomsService, private readonly auth: Auth, private readonly authService: AuthService){
        // console.log(authService.loggedInUser);
        // console.log("IT WORKED");
        
    }

    ngOnInit(): void{

        // const messageContainer = document.getElementById('message-container');
        // console.log(messageContainer);
        
        //Input properties isn't initialized until view is set up so generally you can access input value on ngOnInit()
        // console.log("room messages: "+this.roomId);
        // console.log(this.roomsService.getMessagesByRoomId(this.roomId));
        const unsubscribe = this.roomsService.subscribeToRoomMessages(this.roomId, (newMessages) => {
            // console.log()
            this.messages = [...this.messages, ...newMessages];
            // return newMessages

            //I guess we have to wait for the ng* for loop to generate a new message. then:
            //scroll to bottom of messageContainer to latest message element
            setTimeout(()=>{
                // console.log(messageContainer);
                let messageElems = document.querySelector('.message-container').children; //.scrollIntoView({behavior: "smooth"});                
                if (messageElems.length >= 2){
                    if (this.isFirstLoad){
                        messageElems[messageElems.length - 2].scrollIntoView({behavior: 'auto'});
                        this.isFirstLoad = false;
                    } else {
                        messageElems[messageElems.length - 2].scrollIntoView({behavior: 'smooth'});
                    }
                } 
                
            }, 5)
        
            
        })
    }

    ngAfterViewInit() {
        
    }

    async sendChat(event){
        console.log("sent message: "+ event.target.value);
        //save
        const message: MessageData = {
            // messageId: generateRandom(),
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
