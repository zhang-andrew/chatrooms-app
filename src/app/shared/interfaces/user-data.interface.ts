interface UserData {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    emailVerified: boolean;
}

interface UpdatedUserData {
    uid: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
}

export {
    UserData, UpdatedUserData
}