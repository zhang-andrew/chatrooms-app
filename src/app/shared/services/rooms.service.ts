import { Injectable } from '@angular/core';

import { Firestore, doc, collectionData, docData, getDoc, collection, addDoc, setDoc, updateDoc, DocumentData, CollectionReference} from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { Observable, tap } from 'rxjs';


import { MessageData } from '../interfaces/message-data.interface';
import { RoomData } from '../interfaces/room-data.interface';
import { UserData } from '../interfaces/user-data.interface';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {
    // private roomsCollection: CollectionReference<DocumentData>;
    // private rooms: RoomData[] = [];

    constructor(private readonly db: Firestore){
        // this.roomsCollection = collection(this.db, 'rooms');
        console.log("ROOMSERVICE");
        // this.roomsCollection = collection(this.db, 'rooms');
        // this.rooms = 
        // this.getAllRooms();
        
    }

    //READ
    async getAllRooms(): Promise<DocumentData[]>{
        // const rooms = collectionData(this.roomsCollection, {
        //     idField: 'id',
        // }) as Observable<RoomData[]>;
        // console.log(rooms.pipe(
        //     tap(x => console.log(x))
        // ));
        let rooms: DocumentData[] = [];
        const querySnapshot = await getDocs(collection(this.db, "rooms"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const data = doc.data();
            console.log(data);
            
            // rooms = [...rooms, data]
            // console.log("HERE");
            
            rooms.push(data)
            console.log(`${rooms} / ${rooms.length}`);
            // return rooms
        });
        console.log("HERE");
        console.log(rooms);
        // this.rooms = rooms;
        return rooms;
    }

    private async getRoomDataById(roomId: String){
        const userDocumentReference = doc(this.db, `rooms/${roomId}`);
        const docSnap = await getDoc(userDocumentReference);
        if (docSnap.exists()) {
            console.log("Database Document DOES exist")
            return docSnap.data();
        } else {
            console.log("Database Document does NOT exist")
            return undefined;
        }
    }

    //CREATE
    private async createNewMember(roomId: RoomData["roomId"], memberId: UserData["uid"]){
        //get room Document Reference
        const roomDocumentRef = doc(this.db, `rooms/${roomId}`);
        const docSnap = await getDoc(roomDocumentRef);
        if (docSnap.exists()) {
            console.log("Database Document DOES exist")
            //get roomData
            const documentData = docSnap.data();
            const roomData: RoomData = {
                roomId: documentData['roomId'],
                roomPassword: documentData['roomPassword'],
                messages: documentData['messages'],
                members: (documentData['members'].push(memberId)),  //push new member to array
            }
            //update roomData document
            this.updateRoomData(roomData);
            return {
                message: `success: created new member in room.${roomId}`
            }
        } else {
            return {
                message: `error: room.${roomId} could not be found in database to save new message.`
            }
        }
    }

    private async createNewMessage(roomId: RoomData["roomId"], message: MessageData){
        //get room Document Reference
        const roomDocumentRef = doc(this.db, `rooms/${roomId}`);
        const docSnap = await getDoc(roomDocumentRef);
        if (docSnap.exists()) {
            console.log("Database Document DOES exist")
            //get roomData
            const documentData = docSnap.data();
            const roomData: RoomData = {
                roomId: documentData['roomId'],
                roomPassword: documentData['roomPassword'],
                messages: (documentData['messages'].push(message)), //push new message to array
                members: documentData['members'],
            }
            //update roomData document
            this.updateRoomData(roomData);
            return {
                message: `success: created new message in room.${roomId}`
            }
        } else {
            return {
                message: `error: room.${roomId} could not be found in database to save new message.`
            }
        }
    }

    private createRoomData(room: RoomData){        
        if (room !== null) {
            const roomDocumentRef = doc(this.db, `rooms/${room.roomId}`);
            const data = {
                roomId: room.roomId,
                roomPassword: room.roomPassword,
                messages: room.messages,
                members: room.members,
            };
            console.log("created new roomData");
            return setDoc(roomDocumentRef, data);;
        }
        return {
            message: "could not CREATE userData."
        };
    }

    //UPDATE
    private updateRoomData(room: RoomData) {
        //sets user data to firestore on login
        if (room !== null) {
            const roomDocumentRef = doc(this.db, `rooms/${room.roomId}`);
            const data = {
                roomId: room.roomId,
                roomPassword: room.roomPassword,
                messages: room.messages,
                members: room.members,
            };
            //update any changed fields
            updateDoc(roomDocumentRef, data)
            return {
                message: "updated existing roomData"
            }
        }
        return {
            message: "could not UPDATE roomData."
        };
    }
}
