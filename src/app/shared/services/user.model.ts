import { Firestore } from "@angular/fire/firestore";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { UserData } from "../interfaces/user-data.interface";

export class UserModel{
    constructor(private readonly db: Firestore){}
    ////////////
    // CREATE //
    async createUser(user: UserData){
        const docRef = doc(this.db, `users/${user.uid}`);
        const newUser = await setDoc(docRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,    
        });
        return newUser;
    }
    //////////
    // READ //
    async getUser(uid: UserData['uid']){
        const docRef = doc(this.db, `users/${uid}`);
        const docSnapshot = await getDoc(docRef); 
        if (docSnapshot.exists()){
            const user = docSnapshot.data();
            return user; 
        } else {
            console.log("Document does not exist");
            return null
        }
    }
    ////////////
    // UPDATE //
    async updateUser(user: UserData) {
        const docRef = doc(this.db, `users/${user.uid}`);
        const updatedUser = await updateDoc(docRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,    
        });
        return updatedUser;
    }
    ////////////
    // DELETE //
    async deleteUser(uid: UserData['uid']) {
        const docRef = doc(this.db, `users/${uid}`);
        const deletedUser = await deleteDoc(docRef); 
        return deletedUser;
    }
}