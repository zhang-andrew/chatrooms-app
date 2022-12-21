import { Injectable } from '@angular/core';
import { Firestore } from "@angular/fire/firestore";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { RoomData } from "../interfaces/room-data.interface";

@Injectable({
    providedIn: 'root'
})
export class RoomModel{
    constructor(private readonly db: Firestore){}
    ////////////
    // CREATE //
    async createRoom(room: RoomData){
        //get ref
        const collRef = collection(this.db, "rooms"); 
        const docRef = doc(collRef); // const docRef = doc(this.db, `rooms/${room.roomId}`);
        //create new message
        const newRoom = await setDoc(docRef, {
            roomId: docRef.id, //auto generated id
            roomPassword: room.roomPassword,
            members: room.members,
        });
        return newRoom;
    }
    //////////
    // READ //
    async getRoom(roomId: RoomData['roomId']){
        const docRef = doc(this.db, `rooms/${roomId}`);
        const docSnapshot = await getDoc(docRef); 
        if (docSnapshot.exists()){
            const room = docSnapshot.data();
            return room; 
        } else {
            console.log("Document does not exist");
            return null
        }
    }
    async getRooms(){
        const collRef = collection(this.db, `rooms`);
        const querySnapshot = await getDocs(collRef); 
        const docSnapshots = querySnapshot.docs;
        if (docSnapshots.length > 0) {
            const rooms = docSnapshots.map(doc => doc.data());
            return rooms;
        } else {
            console.log("Collection is empty.")
            return null;
        }
    }

    ////////////
    // UPDATE //
    //updateRoom function that changes only changed data in the database from given data.
    async updateRoom(room: RoomData) {
        const docRef = doc(this.db, `rooms/${room.roomId}`);
        const updatedRoom = await updateDoc(docRef, {
            roomdId: room.roomId,
            roomPassword: room.roomPassword,
            members: room.members,
        });
        return updatedRoom;
    }
    ////////////
    // DELETE //
    async deleteRoom(roomId: RoomData['roomId']) {
        const docRef = doc(this.db, `rooms/${roomId}`);
        const deletedRoom = await deleteDoc(docRef); 
        return deletedRoom;
    }

    async deleteRooms() {

        const collRef = collection(this.db, `rooms`);
        const querySnapshot = await getDocs(collRef); 
        const docSnapshots = querySnapshot.docs;
        if (docSnapshots.length > 0) {
            const roomsRef = docSnapshots.map(doc => doc.ref);
            roomsRef.forEach(async(doc) => {
                // const docRef = doc(this.db, `rooms/${roomId}`);
                // doc.ref
                await deleteDoc(doc)
                // doc.ref.delete();
              });
            // const deletedRoom = await deleteDoc(docRef); 
            // return rooms;
            console.log("successfully deleted all rooms");
            return;
            
        } else {
            console.log("Collection is empty.")
            return null;
        }

        // const docRef = doc(this.db, `rooms/${roomId}`);
        // const deletedRoom = await deleteDoc(docRef); 
        // return deletedRoom;
    }

    ///////////////////////////////////
    // LISTEN / SUBSCRIBE to changes //
    ///////////////////////////////////
    /**
     * Important: The first query snapshot contains added events for all existing documents that match the query. 
     * This is because you're getting a set of changes that bring your query snapshot current with the initial 
     * state of the query. 
     * 
     * This allows you, for instance, to directly populate your UI from the changes you receive in the first 
     * query snapshot, without needing to add special logic for handling the initial state.
     */

    ////////////
    // LISTEN // 
    async subscribeToRooms(callback: Function){
        //get reference to entire collection.
        const roomsCollRef = collection(this.db, "rooms");
        return onSnapshot(roomsCollRef, ( querySnapshot ) => {
            // //get all documents (including changed and unchanged documents)
            // const docSnapshots = querySnapshot.docs;
            
            //only get changed documents (*note: first iteration returns all documents though)
            const changes = querySnapshot.docChanges();
            // const docSnapshots = changes.map( change => change.doc);
            // const rooms = docSnapshots.map( doc => {doc.data()});

            const rooms = changes.map( change => {
                return {
                    type: change.type,
                    data: change.doc.data()
                }
            })

            if (callback){
                callback(rooms);
            }
        })
    }
}