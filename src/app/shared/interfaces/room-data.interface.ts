import { MessageData } from "./message-data.interface";


export interface RoomData {
    roomId: string;
    roomPassword: string;
    messages: Array<MessageData>;
    members: Array<string>;
}
