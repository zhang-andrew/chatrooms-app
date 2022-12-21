import { Injectable } from '@angular/core';

import { Firestore } from '@angular/fire/firestore';
import { DocumentData} from 'firebase/firestore';
// import { Observable, tap } from 'rxjs';

import { MessageData } from '../interfaces/message-data.interface';
import { RoomData } from '../interfaces/room-data.interface';
import { UserData } from '../interfaces/user-data.interface';

import { MessageModel } from './message.model';
import { RoomModel } from './room.model';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {
    // private roomsCollection: CollectionReference<DocumentData>;
    // private rooms: RoomData[] = [];

    constructor(private readonly roomModel: RoomModel, private readonly messageModel: MessageModel) {
        console.log("ROOMSERVICE");
        // this.roomModel = new RoomModel(this.db);
    }
    ////////////
    // CREATE //
    ////////////
    async createRoom(room: RoomData): Promise<void> {
        const newRoom = this.roomModel.createRoom(room);
        return newRoom;
    }

    async createMessage(message: MessageData){
        const newMessage = this.messageModel.createMessage(message);
        return newMessage;
    }

    //////////
    // READ //
    //////////
    // async getRoom(id): Promise<DocumentData>{
    async getRoom(id): Promise<any>{
        const room = this.roomModel.getRoom(id);
        return room;
    }

    async getRooms() {
        const rooms = this.roomModel.getRooms();
        return rooms;
    }

    async getMessagesByRoomId(roomId: string) {
        const messages = this.messageModel.getMessagesByRoomId(roomId);
        return messages;
    }

    ////////////
    // UPDATE //
    ////////////
    async updateRoom(room: RoomData) {
        const updatedRoom = this.roomModel.updateRoom(room);
        return updatedRoom;
    }
    // async updateMessage(messageId, data?) {

    // }

    ////////////
    // DELETE //
    ////////////
    async deleteRoom(roomId){
        //Delete room db.rooms
        const deletedRoom = this.roomModel.deleteRoom(roomId);

        //Delete all messages matching roomId.
        this.messageModel.deleteMessagesByRoomId(roomId);

        return deletedRoom
    }
    async deleteRooms(){
        //Delete room db.rooms
        // const deletedRooms = this.roomModel.deleteRoom(roomId);

        // //Delete all messages matching roomId.
        // this.messageModel.deleteMessagesByRoomId(roomId);

        // const rooms = this.roomModel.getRooms();

        this.roomModel.deleteRooms();

        return 
    }

    ////////////
    // LISTEN //
    ////////////
    async subscribeToRooms(callback){
        const subscription = this.roomModel.subscribeToRooms(callback);
        return subscription
    }

    async subscribeToRoomMessages(roomId, callback){
        const subscription = this.messageModel.subscribeToMessagesByRoomId(roomId, callback);
        return subscription
    }

    //end methods
}