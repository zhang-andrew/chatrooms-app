import { MessageData } from "./message-data.interface";


export interface RoomData {
    roomId?: string;
    roomPassword: string;
    members: Array<string>;
}
