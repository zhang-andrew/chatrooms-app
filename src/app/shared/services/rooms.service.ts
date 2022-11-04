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

    constructor(private readonly db: Firestore, private readonly roomModel: RoomModel, private readonly messageModel: MessageModel) {
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
        this.roomModel.deleteRoom(roomId);

        //Delete all messages matching roomId.
        this.messageModel.deleteMessagesByRoomId(roomId);
    }

    ////////////
    // LISTEN //
    ////////////
    async subscribeToRooms(callback){
        this.roomModel.subscribeToRooms(callback);
    }

    async subscribeToRoomMessages(roomId, callback){
        this.messageModel.subscribeToMessagesByRoomId(roomId, callback);
    }

    //end methods
}