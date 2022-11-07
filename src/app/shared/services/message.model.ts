import { Injectable } from '@angular/core';
import { Firestore } from "@angular/fire/firestore";
import { collection, query, deleteDoc, doc, getDoc, orderBy, setDoc, updateDoc, where, getDocs, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { MessageData } from "../interfaces/message-data.interface";
import { RoomData } from '../interfaces/room-data.interface';

@Injectable({
    providedIn: 'root'
})
export class MessageModel{
    constructor(private readonly db: Firestore){}
    // ////////////
    // // CREATE //
    async createMessage(message: MessageData){
        //get ref
        const collRef = collection(this.db, "messages");
        const docRef = doc(collRef);
        //create new message
        const newMessage = await setDoc(docRef, {
            messageId: docRef.id, //auto generated id
            roomId: message.roomId,
            userId: message.userId,
            displayName: message.displayName,
            createdAt: serverTimestamp(),
            text: message.text
        });
        return newMessage;
    }
    
    //////////
    // READ //
    async getMessage(messageId: MessageData['messageId']){
        const docRef = doc(this.db, `messages/${messageId}`);
        const docSnapshot = await getDoc(docRef); 
        if (docSnapshot.exists()){
            const message = docSnapshot.data();
            return message; 
        } else {
            console.log("Document does not exist");
            return null
        }
    }
    async getMessagesByRoomId(roomId: RoomData['roomId']) {
        //get ref
        const collRef = collection(this.db, "messages");

        //querySnapshot
        const q = query(collRef, where("roomId", "==", `${roomId}`), orderBy("createdAt"));
        const querySnapshot = await getDocs(q); //querySnapshot (think of it as many docSnapshots - plural) //returns a querySnapshot (contains a "docs" property that contains many documentSnapshots plural) 
        
        //get snapshot
        const docSnapshots = querySnapshot.docs;
        if (docSnapshots.length > 0) {
            //remap snapshot to get data
            const messages = docSnapshots.map(doc => doc.data());
            return messages;
        } else {
            console.log("Collection is empty.")
            return null;
        }
    }
    ////////////
    // UPDATE //
    async updateMessage(message: MessageData) {
        const docRef = doc(this.db, `message/${message.messageId}`);
        const updatedMessage = await updateDoc(docRef, {
            messageId: message.messageId,
            roomId: message.roomId,
            userId: message.userId,
            createdAt: message.createdAt,
            text: message.text
        });
        return updatedMessage;
    }
    ////////////
    // DELETE //
    async deleteMessage(messageId: MessageData['messageId']) {
        const docRef = doc(this.db, `messages/${messageId}`);
        const deletedMessage = await deleteDoc(docRef); 
        return deletedMessage;
    }
    async deleteMessagesByRoomId(roomId: RoomData['roomId']){
        //get ref
        const collRef = collection(this.db, "messages");

        //querySnapshot
        const q = query(collRef, where("roomId", "==", `${roomId}`));
        const querySnapshot = await getDocs(q); //querySnapshot (think of it as many docSnapshots - plural) //returns a querySnapshot (contains a "docs" property that contains many documentSnapshots plural) 

        //get snapshot
        const docSnapshots = querySnapshot.docs;
        if (docSnapshots.length > 0) {
            //loop snapshots and get reference from snapshot
            docSnapshots.forEach( async (doc) => {
                const docRef = doc.ref;
                //delete
                deleteDoc(docRef);
            })
        } else {
            console.log("Collection is empty.")
            return null;
        }
    }


    ////////////
    // LISTEN // 
    async subscribeToMessagesByRoomId(roomId: RoomData['roomId'], callback: Function){
        //get reference to entire collection.
        const messagesCollRef = collection(this.db, "messages");
        const q = query(messagesCollRef, where("roomId", "==", `${roomId}`), orderBy("createdAt"));

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
                    console.log("NULL timestamp. returning.");
                    return;
                }
            }

            if (callback){
                callback(messages);
            }
        })
    }
}
