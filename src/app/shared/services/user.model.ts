import { Injectable } from '@angular/core';
import { Firestore } from "@angular/fire/firestore";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { UserData } from "../interfaces/user-data.interface";

@Injectable({
    providedIn: 'root'
})
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
            // photoURL: user.photoURL,
            // emailVerified: false,
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
    async getUserByEmail(email: UserData['email']){
        const collRef = collection(this.db, "users");
        const q = query(collRef, where("email", "==", `${email}`));
        const querySnapshot = await getDocs(q); //querySnapshot (think of it as many docSnapshots - plural) //returns a querySnapshot (contains a "docs" property that contains many documentSnapshots plural) 
        const docSnapshots = querySnapshot.docs;
        if (docSnapshots.length > 0) {
            const [user] = docSnapshots.map(doc => doc.data());
            return user;
        } else {
            console.log("Collection is empty.")
            return null;
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
            // photoURL: user.photoURL,
            // emailVerified: false,
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