

export interface MessageData {
    messageId: string;
    roomId: string;
    userId: string;
    createdAt?: string; //? suffix makes it optional
    text: string;
}
