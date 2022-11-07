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
        <div class="wrapper">
            <ion-list class="message-list">
                <ion-item class="message ion-no-padding ion-no-margin" *ngFor="let message of messages">
                    <ion-text class="ion-text-wrap">
                        <span>{{ message.displayName | json }} :</span>
                        <ion-text class="message-text">
                            {{ message.text | json }}
                        </ion-text>
                    </ion-text>
                </ion-item>
            </ion-list>
            <input class="message-bar" type="text" (keydown.enter)="sendChat($event)">
        </div>
        <!-- <div class="message-container">
            <div class="message" *ngFor="let message of messages">
                <pre>
                    user: {{ message.userId | json }}
                    message: {{ message.text | json }}
                    timestamp: {{ message.createdAt }} 
                </pre>
            </div>
        </div> -->
    `,
    styles: [`
        :host{
            --bg-color: gainsboro;
        }
        .wrapper{
            display: flex;
            flex-direction: column;
            justify-content: end;

            height: 100vh;
            width: 100vw;
            background-color: var(--bg-color);
            padding: 1rem;
            @media (orientation: "portrait") {
                height: 100svh;
            }
        }
        ion-list.message-list{
            overflow-y: scroll;
            overflow-x: hidden;

            padding: 0;
            padding-bottom: 0.2rem;
            
            background-color: var(--bg-color);
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
            --background: transparent;

            --min-height: 0px;
            background-color: var(--bg-color);

            & .message-text{
                padding-left: 0.5ch;
                /* padding-right: 0.3rem; */
                box-decoration-break: clone;
            }
        }


        .message-bar{
            width: 100%;
            height: 2rem;
            height: 3.5ch;
        }
        input.message-bar{
            background-color: rgba(0, 0, 0, 0.1);
            font-size: 16px;
            /* box-shadow: inset 0px 1px 8px rgba(0, 0, 0, 0.2); */
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
    isFirstLoad: boolean = true;
    constructor(private readonly roomsService: RoomsService, 
        private readonly auth: Auth, 
        private readonly authService: AuthService){
        // console.log(authService.loggedInUser);
        // console.log("IT WORKED");
        // this.isFirstLoad = true;
        // console.log(this.isFirstLoad);

        
        
    }

    async ngOnInit(){

        // const messageContainer = document.getElementById('message-container');
        // console.log(messageContainer);
        
        //Input properties isn't initialized until view is set up so generally you can access input value on ngOnInit()
        // console.log("room messages: "+this.roomId);
        // console.log(this.roomsService.getMessagesByRoomId(this.roomId));
        const unsubscribe = await this.roomsService.subscribeToRoomMessages(this.roomId, (newMessages) => {
            console.log(this.isFirstLoad);
            this.messages = [...this.messages, ...newMessages];
            
            // return newMessages

            //I guess we have to wait for the ng* for loop to generate a new message. then:
            //scroll to bottom of messageContainer to latest message element
            setTimeout(()=>{
                let messageElems = document.querySelector('.message-list').children; //.scrollIntoView({behavior: "smooth"});
                console.log(messageElems.length);
                if (messageElems.length >= 2){
                    if (this.isFirstLoad){
                        // messageElems[messageElems.length - 2].scrollIntoView({behavior: 'auto'});
                        document.querySelector('.message-list').scrollTo({
                            top: this.getElementBottom(messageElems[messageElems.length - 2]),
                            behavior: "auto",
                        })
                        this.isFirstLoad = false;
                    } else {
                        // messageElems[messageElems.length - 2].scrollIntoView({behavior: 'smooth'});
                        document.querySelector('.message-list').scrollTo({
                            top: this.getElementBottom(messageElems[messageElems.length - 2]),
                            behavior: "smooth",
                        })
                    }
                } 
            }, 50)
            console.count();
            
            
        })
    }

    ngAfterViewInit() {   

        
        // //some angular magic - tl;dr: using setTimeout makes your code async, by adding a function execution to the event loop, and triggering change detection a second time when it executes. It does have a performance hit.
        // setTimeout(()=>{

        //     // let messageElems = (<HTMLInputElement>document.querySelector('.message-list')); //.scrollIntoView({behavior: "smooth"});
        //     // console.log(messageElems.hasChildNodes);
        //     // let messages = document.querySelectorAll('.message');
        //     // console.log(messages);
            
            
        //     // document.querySelector('.message-list').scrollTo({
        //     //     top: this.getElementBottom(messageElems[messageElems.length - 2]),
        //     //     behavior: "smooth",
        //     // })

        //     //autofocus on messeage bar
        //     const messageBar = (<HTMLInputElement>document.querySelector('.message-bar'));
        //     messageBar.focus();
        //     messageBar.select();
        // }, 10)

    }

    async sendChat(event){
        if (event.target.value == ""){
            return
        }
        console.log("sent message: "+ event.target.value);
        console.log(this.authService.currentUser.displayName);
        
        //save
        const message: MessageData = {
            // messageId: generateRandom(),
            userId: this.auth.currentUser.uid,
            displayName: this.authService.currentUser.displayName,
            // createdAt: "",
            text: event.target.value,
            roomId: this.roomId
        }
        // this.roomsService.createNewMessage(this.roomId, message);
        await this.roomsService.createMessage(message);

        //reset input
        event.target.value = "";
    }


    //returns an element's bottom position relative to the whole document (body):
    private getElementBottom(element){
        // values returned by getBoundingClientRect is affected by scrolling
        const rect = element.getBoundingClientRect(); //rect.top, rect.right, rect.bottom, rect.left);
        const top = rect.top;
        //so we add the value by the viewport top, to get the relative top position of the element
        return top + window.scrollY + element.offsetHeight;
    }

}



//returns an element's top position relative to the whole document (body):
function getElementTop(element){
    // values returned by getBoundingClientRect is affected by scrolling
    const rect = element.getBoundingClientRect(); //rect.top, rect.right, rect.bottom, rect.left);
    const top = rect.top;
    //so we add the value by the viewport top, to get the relative top position of the element
    return top + window.scrollY;
}

