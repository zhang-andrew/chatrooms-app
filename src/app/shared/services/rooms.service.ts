import { Injectable } from '@angular/core';

import { Firestore, doc, collectionData, docData, getDoc, collection, addDoc, setDoc, updateDoc, DocumentData, CollectionReference, collectionChanges } from '@angular/fire/firestore';
import { getDocs, query, DocumentReference, QuerySnapshot, onSnapshot } from 'firebase/firestore';
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

    constructor(private readonly db: Firestore) {
        // this.roomsCollection = collection(this.db, 'rooms');
        console.log("ROOMSERVICE");
        // this.roomsCollection = collection(this.db, 'rooms');
        // this.rooms = 
        // this.getAllRooms();

    }

    //READ
    async getRoom(id): Promise<DocumentData | null>{
        //get reference to a document in collection
        const roomDocRef = doc(this.db, "rooms", id);

        //documentSnapshot 
        const docSnapshot = await getDoc(roomDocRef); //returns a documentSnapshot
        if(docSnapshot.exists()) {
            //get documentData
            const room = docSnapshot.data();
            return room;
        } else {
            console.log("Document does not exist")
            return null;
        }
    }
    async getRoomAndSubscribe(){

    }
    async subscribeToRoom(){

    }
    async getRooms() {
        //get reference to entire collection.
        // const roomsCollRef = query(collection(this.db, "rooms"));
        const roomsCollRef = collection(this.db, "rooms");

        //querySnapshot (think of it as many documentSnapshots - plural)
        const querySnapshot = await getDocs(roomsCollRef); //returns a querySnapshot (contains a "docs" property that contains many documentSnapshots plural) 
        //documentSnapshots (plural) 
        const docSnapshots = querySnapshot.docs;
        if (docSnapshots.length > 0) {
            // docSnapshots.forEach(doc => {
            //     console.log(doc.data());
            //     console.log(doc.id);
            // })
            //get document(s) data.
            const rooms = docSnapshots.map(doc => doc.data());
            return rooms;
        } else {
            console.log("Collection is empty.")
            return null;
        }
    }
    async subscribeToRooms(callback){
        //get reference to entire collection.
        const roomsCollRef = collection(this.db, "rooms");

        //subscribes to data changes in the rooms cloud data, and runs the callback function
        // return onSnapshot(roomsCollRef, async (querySnapshot: QuerySnapshot) => {
        //     const docSnapshots = querySnapshot.docs;
        //     if (docSnapshots.length > 0) {
        //         //get document(s) data.
        //         const rooms = docSnapshots.map(doc => doc.data());
        //         return rooms;
        //     } else {
        //         console.log("Collection is empty.")
        //         return null;
        //     }
        // })

        return onSnapshot(roomsCollRef, ( querySnapshot ) => {
            //get all documents (including changed and unchanged documents)
            const docSnapshots = querySnapshot.docs;
            if (docSnapshots.length > 0) {
                //get document(s) data.
                const rooms = docSnapshots.map(doc => doc.data());
                callback(rooms);
                return rooms;
            } else {
                console.log("Collection is empty.")
                return null;
            }

            //only get changed documents
            const changes = querySnapshot.docChanges();
            const rooms = changes.map( change => change.doc.data());
            callback(rooms);
            return rooms
        })

        // return new Promise( resolve => {
        //     onSnapshot(roomsCollRef, ( querySnapshot ) => {
        //         // const docSnapshots = querySnapshot.docs;
        //         const changes = querySnapshot.docChanges();
        //         const rooms = changes.map( change => change.doc.data());
        //         // return rooms
        //         resolve (rooms);
        //         // const changes = querySnapshot.docChanges().forEach( (change) => {
        //         //     if (change.type === "added") {
        //         //         console.log("New city: ", change.doc.data());
        //         //     }
        //         //     if (change.type === "modified") {
        //         //         console.log("Modified city: ", change.doc.data());
        //         //     }
        //         //     if (change.type === "removed") {
        //         //         console.log("Removed city: ", change.doc.data());
        //         //     }
        //         //     const rooms = docSnapshots.map(doc => doc.data());
        //         // });
        //     })
        // })

        // return await cb();

        // const fetchNewMessages = (threadId: string, latestTimestamp: any) => {
        //     const q = query(threadRef(threadId), orderBy('timestamp', 'asc'), startAfter(latestTimestamp));
        //     const messages: IMessage[] = [];
        //     return new Promise((resolve) => {
        //       onSnapshot(q, (querySnapshot) => {
        //         const docs = querySnapshot.docChanges();
        //         docs.forEach((change) => {
        //           if (change.type === "added")
        //             messages.push(fetchDoc(change.doc));
        //         });
        //         resolve(messages.reverse());
        //       });
        //     });
        //   };
    }


    async getAllRooms(): Promise<DocumentData[]> {
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

    private async getRoomDataById(roomId: String) {
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
    private async createNewMember(roomId: RoomData["roomId"], memberId: UserData["uid"]) {
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

    private async createNewMessage(roomId: RoomData["roomId"], message: MessageData) {
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

    async createRoomData(room: RoomData) {
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
