import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { MessageData } from 'src/app/shared/interfaces/message-data.interface';

// import { AuthService } from 'src/app/shared/services/auth.service';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/shared/services/auth.service';

import { IonicModule } from '@ionic/angular';
// import { Router } from '@angular/router';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { RoomData } from 'src/app/shared/interfaces/room-data.interface';
import { SingletonService } from 'src/app/shared/services/singleton.service';

@Component({
    selector: 'app-rooms-chatroom',
    standalone: true,
    imports: [CommonModule, IonicModule],
    template: `
        <div class="wrapper">
        
            <ion-content class="content ion-padding"> <!-- [fullscreen]="true"  -->
                <div class="support">
                    <p>some text</p>
                </div>
                <ion-list class="message-list {{this.roomId}}">
                    <ion-item class="message ion-no-padding ion-no-margin" *ngFor="let message of messages">
                        <ion-text class="ion-text-wrap">
                            <span> {{ message.displayName }}:</span>
                            <!-- <span>
                                <ion-textarea [readonly]="true">
                                    {{ message.text }}
                                </ion-textarea>
                            </span> -->
                            
                            <ion-text class="message-text ion-text-wrap">
                                {{ message.text }}
                                <!-- {{ message.text | json }} -->
                            </ion-text>
                        </ion-text>
                    </ion-item>
                </ion-list>
            </ion-content>
            
            <ion-footer [translucent]="true">
                <ion-toolbar class="ion-text-wrap">
                    <ion-textarea class="message-bar {{this.roomId}}" autofocus="true" enterkeyhint="send" spellcheck="false" autoGrow="false" inputmode="text" type="text" (keydown.enter)="sendChat($event)" placeholder="Enter text"></ion-textarea>
                    <!-- <ion-input class="message-bar " type="text" (keydown.enter)="sendChat($event)"  placeholder="Enter text"></ion-input> -->
                </ion-toolbar>
            </ion-footer>
            
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
            height: 100%;
            width: 100%;
            --bg-color: white;
        }
        .wrapper{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;

            /* height: 100vh;
            width: 100vw; */
            height: 100%;
            width: 100%;
            background-color: var(--bg-color);
            /* padding: 1rem; */
            /* @media (orientation: "portrait") {
                height: 100svh;
            } */
            /* overflow: hidden; */
        }
        ion-content{
            overflow: hidden;
        }
        ion-content::part(scroll){
            /* background-color: red;
            --background: red; */
            display: flex;
            justify-content: flex-start; /* content starts at the beginner as usual */
            flex-direction: column-reverse; /* But reverse it */
            
            /* align-items: end;
            flex: 1 1 auto; */
            /* margin-top: auto; */
            /* float: bott */
            /* position: absolute; */
            /* bottom: 0 !important; */
            /* vertical-align: bottom; */
        }
        .support{
            margin: auto;
            position: absolute;
            text-align: center;
            bottom: 20px;
            width: 100%;
        }

        ion-list.message-list{
            overflow-y: scroll;
            overflow-x: hidden;

/* 
            flex: 1 1 auto;
            overflow-y: auto; */
            /* height: 0px; */
            /* display: flex;
            flex-direction: column-reverse; */
            /* padding: 0;
            padding-bottom: 0.2rem; */
            /* vertical-align: bottom; */
            
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

        input.message-bar{
            width: 100%;
            height: 2rem;
            height: 3.5ch;

            background-color: rgba(0, 0, 0, 0.1);
            font-size: 16px;
            /* border-radius: 5px */
            /* --inner-padding-left: 1rem; */
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
    // contentElem;
    subscription = {
        unsubscribe: null
    };
    currUrl;
    // inactivityTime;
    

    constructor(private readonly roomsService: RoomsService, 
        private readonly auth: Auth, 
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly singletonService: SingletonService){
        // console.log(authService.loggedInUser);
        // console.log("IT WORKED");
        // this.isFirstLoad = true;
        // console.log(this.isFirstLoad);
        this.currUrl = this.router.url;


        // this.router.events.subscribe( async(event) => {
        //     if (event.url == "/"){
        //         console.log(event.url)
        //     }
            
        //     if (event instanceof NavigationStart) {
        //         console.log("   ## start of navigation");

                
        //     }
        //     if (event instanceof NavigationEnd) {
        //         console.log("   ## end of navigation");
        //         // try {
        //         //     this.subscription.unsubscribe();
        //         // } catch (error) {
        //         //     console.log(error);
        //         //     console.log(this.subscription.unsubscribe);
                    
                    
        //         // }
        //     }
        // })

        // router.events.subscribe(
        //     (event) => {
        //         if ( event instanceof NavigationStart ) {
        //             // Handle Navigation Start
        //         }

        //         if ( event instanceof NavigationEnd ) {
        //             // Handle Navigation End
        //         }
        //     });
    }

    // ngOnInit(): void {
        
    // }

    // @HostListener('window:onload')
    // beforeOnloadHandler() {
    //     console.log("WAS REFRESHED, RESTARTING ngOnInit()");
        
    //     // this.ngOnInit();
    //     this.ngOnDestroy();
    //     console.log("MANUALLY DELETED");
        
    //     return true
    // }

    // @HostListener('window:beforeunload', ['$event'])
    // beforeUnloadHander() {
    //     // or directly false
    //     // this.allowRedirect;
    //     // this.subscription
    //     // return false;
    //     this.ngOnDestroy;
    //     // this.router.navigate(['/rooms']);
    //     console.log("MANUALLY DELETED");

    //     // //destroy onSnapShot listener, when domTree no-longer has this component.
    //     // this.subscription.unsubscribe()
    //     // console.log("&&& Subscription Destroyed. on " + this.currUrl);

    //     // //update members list, remove this user from this room's member list, reverse of the joinRoom func
    //     // this.roomsService.getRoom(this.roomId)
    //     //     .then(roomData => {
    //     //         console.log("currentUser is: "+this.authService.currentUser.displayName);
                
    //     //         const existingMembers = roomData['members'];
    //     //         // The filter() method creates a new array filled with elements that pass a test provided by a function.
    //     //         const updatedMembers = existingMembers.filter( (member) => {
    //     //             return member != this.authService.currentUser.displayName
    //     //         })

    //     //         const updatedRoomData: RoomData = {
    //     //             roomId: this.roomId,
    //     //             roomPassword: roomData['roomPassword'],
    //     //             members: updatedMembers,
    //     //         }
    //     //         //update members list
    //     //         this.roomsService.updateRoom(updatedRoomData);
    //     //         console.log(`removed user: '${this.authService.currentUser.displayName}' from roomData list`);
    //     //     })

    //     // return true;
    // }

    inactivityTime(router) {
        // Would be much better to have a flag var notIdle; 
        // set that flag = true only on the events. 
        // Then in the resetTimer function test if the notIdle flag is true, 
        // if it is reset the timer their, or call logout. 
        // This will remove the complexity overhead of constantly resetting the timer. 

        var time;
        var tmpURL;

        router.events.subscribe( async(event) => {
            if (event instanceof NavigationEnd){
                tmpURL = event.url;
                
            }
        })
        
        // window.onload = resetTimer;

        // DOM Events
        // document.onmousemove = resetTimer;
        // document.onkeydown = resetTimer;
        // window.onmousedown = resetTimer;  // catches touchscreen presses as well      
        // window.ontouchstart = resetTimer; // catches touchscreen swipes as well      
        // window.ontouchmove = resetTimer;  // required by some devices 
        // window.onclick = resetTimer;      // catches touchpad clicks as well
        
        document.addEventListener('mousemove', resetTimer); // catches mouse move
        document.addEventListener('keydown', resetTimer); // catches keyboard press
        document.addEventListener('mousedown', resetTimer); // catches touchscreen presses as well  
        document.addEventListener('touchstart', resetTimer); // catches touchscreen swipes as well      
        document.addEventListener('touchmove', resetTimer); // required by some devices 
        document.addEventListener('click', resetTimer); // catches touchpad clicks as well
        window.addEventListener('scroll', resetTimer, true); // improved; see comments. Comment: just wanted to point out that window.onscroll will not fire if scrolling is inside a scrollable element, because scroll events don't bubble. Using window.addEventListener('scroll', resetTimer, true), 
        
    
        // function logout() {
        //     alert("You are now logged out.")
        //     //location.href = 'logout.html'
        // }
    
        function resetTimer() {
            clearTimeout(time);
            console.log("Timer cleared");
            time = setTimeout( () => {
                if (tmpURL.startsWith('/rooms/')){
                    console.log("User unresponsive for 120 seconds. (2min)");
                    //kick user, by navigating away. (this triggers the onNgDestroy())
                    router.navigate(["/rooms"]);    
                } else {
                    console.log("Do nothing, and remove listeners that resetTimer");
                    //remove the listeners
                    document.removeEventListener('mousemove', resetTimer);
                    document.removeEventListener('keydown', resetTimer); 
                    document.removeEventListener('mousedown', resetTimer);
                    document.removeEventListener('touchstart', resetTimer);
                    document.removeEventListener('touchmove', resetTimer);
                    document.removeEventListener('click', resetTimer); 
                    window.removeEventListener('scroll', resetTimer, true);               
                }
            }, 120000)
            // 1000 milliseconds = 1 second
        }
    };


    async ngOnInit(){
        // this.ngOnDestroy()
        console.log("Chatrooms ngOnInit");
        
        // this.resetTimer();
        this.inactivityTime(this.router);
        
        //if first load
        // console.log(this.isFirstLoad);
        // console.log(this.singletonService.props.isInRoom);
        // if (this.singletonService.props.isInRoom){
        //     this.messages = [...this.messages, {
        //         "displayName": "[System]",
        //         "text": "You have entered the chat." 
        //     }]
        //     // this.isFirstLoad = false;
        // }

        //start inactivity counter
        // document.addEventListener('mousemove', this.resetTimer, true);
        // document.onmousemove = this.resetTimer;
        // document.onkeydown = this.resetTimer;
        

        // //router navigation subscription
        // this.router.events.subscribe( async(event) => {
        //     if (event instanceof NavigationStart){
        //         // if (event.url.startsWith('/rooms/')){
        //             const browserRefresh = !this.router.navigated;
        //             console.log("REFRESHREFRESH +"+browserRefresh);
                    
        //             if (browserRefresh){
        //                 console.log("Refresh happened in a chatroom, rerouting to '/rooms'" + browserRefresh);
        //                 this.router.navigate(["/rooms"])
        //                 // return;
        //             }
        //         // }
        //     }
        // })
        
        //start subscription to RoomMessages
        this.subscription.unsubscribe = await this.roomsService.subscribeToRoomMessages(this.roomId, (newMessages) => {
            console.log("@@@ SUBSCRIPTION to ROOM MESSAGES TRIGGERED. @: "+this.roomId);
            
            // //send enter message
            // if (this.singletonService.props.enteredRoom){
            //     // this.singletonService.props.enteredRoom = false;
            //     this.messages = [...this.messages, {
            //         "displayName": "[System]",
            //         "text": "Due to database constraints, only the ten most recent messages were retrieved.", 
            //     }]
            // }

            //set messages first
            this.messages = [...this.messages, ...newMessages];
            console.log(...newMessages);
            

            //send sytem enter message
            if (this.singletonService.props.enteredRoom){
                this.singletonService.props.enteredRoom = false;
                
                console.log([...newMessages].length);
                if ([...newMessages].length < 10){
                    this.messages = [...this.messages, 
                        // {
                        // "displayName": "[System]",
                        // "text": "Less than 10.", 
                        // }, 
                        {
                            "displayName": "[System]",
                            "text": "You have entered the chat.", 
                        }
                    ]
                    
                } else {
                    this.messages = [...this.messages, 
                        // {
                        //     "displayName": "[System]",
                        //     "text": "Due to database constraints, only the ten most recent messages were retrieved.", 
                        // }, 
                        {
                            "displayName": "[System]",
                            "text": "You have entered the chat.", 
                        }
                    ]  
                }
                
            }

            
            
            //////////////////////////////////////
            // AFter message, Auto scroll down to bottom of list 
            //////////////////////////////////////
            // let messageElems = document.querySelector('.message-list').children; //.scrollIntoView({behavior: "smooth"});
            // console.log(messageElems.length);

            // if (messageElems.length >= 2){
            //     messageElems[messageElems.length - 2].scrollIntoView({
            //         behavior: "smooth",
            //         block: "start"
            //     })
            // }

            //get all messageLists
            const messageLists = document.querySelectorAll(`.message-list`);
            console.log("YESYES3");
            messageLists.forEach(list => {
                const classes = list.classList;
                console.log("YESYES3");
                if (classes.contains(this.roomId)) {
                    // const correctList = <HTMLElement>list.querySelector()
                    const messages = list.children;
                    console.log(messages.length);
                    console.log("YESYES4");
                    console.log(messages.length);

                    window.setTimeout(() => {
                        //Scroll to bottom
                        console.log(messages.length);
                        messages[messages.length - 1].scrollIntoView({ behavior: 'smooth' });
                        console.log("scrolled to bottom");
                    }, 100)
                }
            })

                // if (messageElems.length >= 2){
                //     if (this.isFirstLoad){
                //         // messageElems[messageElems.length - 2].scrollIntoView({behavior: 'auto'});
                //         // document.querySelector('.message-list')
                //         this.contentElem.scrollTo({
                //             top: this.getElementBottom(messageElems[messageElems.length - 2]),
                //             behavior: "auto",
                //         })
                //         this.isFirstLoad = false;
                //     } else {
                //         // messageElems[messageElems.length - 2].scrollIntoView({behavior: 'smooth'});
                //         // document.querySelector('.message-list').scrollTo({
                //         // // this.contentElem.scrollTo({
                //         //     top: this.getElementBottom(messageElems[messageElems.length - 2]),
                //         //     behavior: "smooth",
                //         // })
                //         messageElems[messageElems.length - 2].scrollIntoView({
                //             behavior: "smooth",
                //             block: "start"
                //         })
                //         // document.querySelector('.message-list').scrollIntoView({
                //         //     behavior: "smooth",
                //         //     block: "end"
                //         // })
                //         console.log("scrolling to");
                        
                //     }
                // } 
            // }, 10)
            console.count();
        })
        // console.log("#######################");
        // console.log(this.subscription.unsubscribe);
        
        // // Stop listening to changes
        // unsubscribe();

        // ngOnDestroy only fires when the component is destroyed inside the angular workflow. 
        // However, refreshing the page is outside of the workflow and so this method does not fire. 
        // To handle an action when the user leaves/refreshes the page you need to use onbeforeunload.
        // window.onbeforeunload = () => this.ngOnDestroy();
        
    }



    ngAfterViewInit(){
        // //autofocus on messeage bar
        // const messageBar = (<HTMLInputElement>document.querySelector('.message-bar'));
        // messageBar.focus();
        // messageBar.select();
    }

    ngOnDestroy(){
        //destroy onSnapShot listener, when domTree no-longer has this component.
        this.subscription.unsubscribe()
        console.log("&&& Subscription Destroyed. on " + this.currUrl);

        //update members list, remove this user from this room's member list, reverse of the joinRoom func
        this.roomsService.getRoom(this.roomId)
            .then(roomData => {
                console.log("currentUser is: "+this.authService.currentUser.displayName);
                
                const existingMembers = roomData['members'];
                // The filter() method creates a new array filled with elements that pass a test provided by a function.
                const updatedMembers = existingMembers.filter( (member) => {
                    return member != this.authService.currentUser.displayName
                })

                const updatedRoomData: RoomData = {
                    roomId: this.roomId,
                    roomPassword: roomData['roomPassword'],
                    members: updatedMembers,
                }
                //update members list
                this.roomsService.updateRoom(updatedRoomData);
                console.log(`removed user: '${this.authService.currentUser.displayName}' from roomData list`);
            })
    }

    // ngAfterViewInit() {   

        
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

    // }


    //send system message
    // async sendSystemMessage(){

    // }

    //send user message
    async sendChat(event){
        event.preventDefault();
        //if message empty, ignore (Bug: does not count shift+enters as null, so it still gets sent.)
        if (event.target.value == null){
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

        //reset input, immediately
        event.target.value = "";
        // .value.trimStart() : '

        //then send to database
        // this.roomsService.createNewMessage(this.roomId, message);
        await this.roomsService.createMessage(message);

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

