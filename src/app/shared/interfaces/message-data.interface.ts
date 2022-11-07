

export interface MessageData {
    messageId?: string;
    roomId: string;
    userId: string;
    displayName: string;
    createdAt?: string; //? suffix makes it optional
    text: string;
}
