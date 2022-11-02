import { Injectable } from '@angular/core';

import { Firestore, doc, serverTimestamp, collectionData, docData, getDoc, addDoc, updateDoc, DocumentData, CollectionReference, collectionChanges } from '@angular/fire/firestore';
import { getDocs, query, DocumentReference, QuerySnapshot, setDoc, onSnapshot, collection, where} from 'firebase/firestore';
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
    ////////////
    // CREATE //
    ////////////
    async createRoom(room: RoomData) {
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

    async createMessage(message: MessageData){
        if (message !== null) {
            const messageCollectionRef = await collection(this.db, "messages");
            const messageDocumentRef = await doc(messageCollectionRef);
            // const messageDocumentRef = messageCollectionRef.docs
            // const timestamp = await serverTimestamp();
            const data = {
                messageId: messageDocumentRef.id, //auto generated id
                roomId: message.roomId,
                userId: message.userId,
                createdAt:  serverTimestamp(),
                text: message.text
            };
            console.log("created new messageData");
            
            return setDoc(messageDocumentRef, data);;
        }
        return {
            message: "could not CREATE messageData."
        };
    }


    //////////
    // READ //
    //////////
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
    

    async getMessagesByRoomId(roomId: string) {
        //get a reference to entire collection.
        const messagesCollRef = collection(this.db, "messages");
        // Create a query against the collection.
        const q = query(messagesCollRef, where("roomId", "==", `${roomId}`));

        //querySnapshot (think of it as many documentSnapshots - plural)
        const querySnapshot = await getDocs(q); //returns a querySnapshot (contains a "docs" property that contains many documentSnapshots plural) 
        //documentSnapshots (plural) 
        const docSnapshots = querySnapshot.docs;
        if (docSnapshots.length > 0) {
            //get document(s) data.
            const messages = docSnapshots.map(doc => doc.data());
            console.log("Found room Messages"+ messages);
            console.log("orderBy (timestamp, createdAt) here.");
            return messages;
        } else {
            console.log("Collection is empty.")
            return null;
        }

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

    




    ////////////
    // UPDATE //
    ////////////
    private updateMessage(messageId, data?) {}
    private updateRoom(room: RoomData) {
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
    // async addMemberToRoom(roomId: RoomData["roomId"], member) {}



    ////////////
    // LISTEN //
    ////////////
    async subscribeToRooms(callback){
        //get reference to entire collection.
        const roomsCollRef = collection(this.db, "rooms");

        /**
         * Important: The first query snapshot contains added events for all existing documents that match the query. 
         * This is because you're getting a set of changes that bring your query snapshot current with the initial 
         * state of the query. 
         * 
         * This allows you, for instance, to directly populate your UI from the changes you receive in the first 
         * query snapshot, without needing to add special logic for handling the initial state.
         */
        return onSnapshot(roomsCollRef, ( querySnapshot ) => {
            // //get all documents (including changed and unchanged documents)
            // const docSnapshots = querySnapshot.docs;
            // if (docSnapshots.length > 0) {
            //     //get document(s) data.
            //     const rooms = docSnapshots.map(doc => doc.data());
            //     callback(rooms);
            //     return rooms;
            // } else {
            //     console.log("Collection is empty.")
            //     return null;
            // }

            //only get changed documents
            const changes = querySnapshot.docChanges();
            const docSnapshots = changes.map( change => change.doc);
            const rooms = docSnapshots.map( doc => doc.data());
            // const rooms = changes.map( change => change.doc.data());
            callback(rooms);
            // return rooms
        })
    }

    async subscribeToRoomMessages(roomId: string, callback){
        //get reference to entire collection.
        const messagesCollRef = collection(this.db, "messages");
        // Create a query against the collection.
        const q = query(messagesCollRef, where("roomId", "==", `${roomId}`));

        return onSnapshot(q, ( querySnapshot ) => {
            //only get changed documents
            const changes = querySnapshot.docChanges();
            const docSnapshots = changes.map( change => change.doc);
            const messages = docSnapshots.map( doc => doc.data());
            
            //account for createdAt = serverTimestamp() which is set when the document reaches the server, it is null initially, 
            //this triggers the subscription listener for roomMessages, when the createdAt property changes on server-side(firebase side).
            for (let i=0; i<messages.length; i++){
                const message = messages[i];
                if (message["createdAt"] == null){
                    console.log("CAUGHT NULL CREATEDAT TIEMSTAMP, returnibng");
                    console.log(message["createdAt"]);
                    return;
                }
            }

            // const rooms = changes.map( change => change.doc.data());
            callback(messages);
            // return rooms
        })
    }

    //end methods
}