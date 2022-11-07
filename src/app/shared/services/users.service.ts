import { Injectable } from '@angular/core';

// import { Firestore } from '@angular/fire/firestore';
// import { DocumentData} from 'firebase/firestore';
// import { Observable, tap } from 'rxjs';

import { MessageData } from '../interfaces/message-data.interface';
import { RoomData } from '../interfaces/room-data.interface';
import { UpdatedUserData, UserData } from '../interfaces/user-data.interface';

// import { MessageModel } from './message.model';
// import { RoomModel } from './room.model';
import { UserModel } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    // private roomsCollection: CollectionReference<DocumentData>;
    // private rooms: RoomData[] = [];

    constructor(private readonly userModel: UserModel) {
        console.log("USERSERVICE");
    }
    ////////////
    // CREATE //
    ////////////
    // async createRoom(room: RoomData): Promise<void> {
    //     const newRoom = this.roomModel.createRoom(room);
    //     return newRoom;
    // }

    // async createMessage(message: MessageData){
    //     const newMessage = this.messageModel.createMessage(message);
    //     return newMessage;
    // }

    //////////
    // READ //
    //////////
    async getUser(id): Promise<any>{
        const user = await this.userModel.getUser(id);
        return user;
    }

    // async getRooms() {
    //     const rooms = this.roomModel.getRooms();
    //     return rooms;
    // }

    // async getMessagesByRoomId(roomId: string) {
    //     const messages = this.messageModel.getMessagesByRoomId(roomId);
    //     return messages;
    // }

    ////////////
    // UPDATE //
    ////////////
    async updateUser(user: UpdatedUserData) {
        // const updatedUser = await this.userModel.updateUser(user);
        // return updatedUser;
        return new Promise( async(resolve, reject) => {
            try {
                const updatedUser = await this.userModel.updateUser(user);
                resolve(updatedUser);
            } catch (error) {
                reject({
                    result: "failed",
                    error: error,
                });
            }
        })
    }
    // async updateMessage(messageId, data?) {

    // }

    ////////////
    // DELETE //
    ////////////
    // async deleteRoom(roomId){
    //     //Delete room db.rooms
    //     this.roomModel.deleteRoom(roomId);

    //     //Delete all messages matching roomId.
    //     this.messageModel.deleteMessagesByRoomId(roomId);
    // }

    ////////////
    // LISTEN //
    ////////////
    // async subscribeToUser(uid, callback){
    //     this.userModel.subscribeToUser(this.currentUser.uid, (userChanges) => {
    //     })
    // }
    // async subscribeToRooms(callback){
    //     this.roomModel.subscribeToRooms(callback);
    // }

    // async subscribeToRoomMessages(roomId, callback){
    //     this.messageModel.subscribeToMessagesByRoomId(roomId, callback);
    // }

    //end methods
}