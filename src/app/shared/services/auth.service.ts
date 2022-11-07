import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//firebase modules (@angular/fire/*)
import { signInAnonymously } from 'firebase/auth';
import { User, Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, doc, docData, getDoc, collection, addDoc, setDoc, updateDoc} from '@angular/fire/firestore';
//interfaces
import { LoginData } from '../interfaces/login-data.interface';
import { UserData } from '../interfaces/user-data.interface';

//
import { UserModel } from './user.model';




// import { Observable } from 'rxjs';
//newlyadded modules (sort them)

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isLoggedIn: Boolean = false;
    currentUser = {
        uid: null,
        displayName: null,
    }

    constructor(private readonly auth: Auth, private readonly router: Router, private readonly userModel: UserModel){
        console.log("AUTHSERVICE INITIALISED");

        this.auth.onAuthStateChanged( async (authUser) => {
            // console.log("AUTHUSERSTATECHANGE");
            if (authUser){
                this.isLoggedIn = true;
                this.currentUser.uid = this.auth.currentUser.uid;

                const dbUser = await this.userModel.getUser(this.auth.currentUser.uid);
                this.currentUser.displayName = dbUser['displayName'];
                // console.log(dbUser);

            } else {
                this.isLoggedIn = false;
                this.currentUser.uid = null;
            }
            console.log("AUTHSTATE CHANGED: CURRENTUSER: "+JSON.stringify(this.currentUser));
        })

        // if (this.isLoggedIn){
        //     //sync with database for other object properties.
        //     const dbUser = this.userModel.getUser(this.auth.currentUser.uid)
        //         .then(dbUser => {
        //             console.log(dbUser);
        //             this.currentUser.displayName = dbUser['displayName'];
        //             console.log("AUTHSERVICE CURRENTUSER: "+JSON.stringify(this.currentUser));
        //         })
        //         .catch(e => {console.log(e);
        //         })
        // } else {
        //     console.log("not logged in");
            
        // }
    }



    //methods
    async login({email, password}: LoginData) {
        // const credential = await signInWithEmailAndPassword(this.auth, email, password);    
        // this.router.navigate(['/rooms']);
        // console.log("signed in with email and password");
        return new Promise( async(resolve, reject) => {
            try {
                const credential = await signInWithEmailAndPassword(this.auth, email, password);    
                //Signed in
                this.router.navigate(['/rooms']);
                resolve(credential);
            } catch (error) {
                reject({
                    result: "failed",
                    error: error,
                })
            }
        })
    }
    async loginAsGuest(){
        return new Promise( async(resolve, reject) => {
            try {
                const guestCredential = await signInAnonymously(this.auth);
                //Signed in
                this.router.navigate(['/rooms']);

                //Is a new user (guest user), create a userData in database
                const newUser = await this.userModel.createUser(guestCredential.user); // const result = await this.createUserData(user);
                console.log("logged in as guest, new user.");

                resolve(guestCredential);
            } catch (error) {
                reject({
                    result: "failed",
                    error: error,
                })
            }
        })
    }
    async loginWithProvider(provider){
        let authProvider = null;
        switch (provider) {
            case "google":
                authProvider = new GoogleAuthProvider();
                break;
            default:
                break;
        }
        return new Promise( async(resolve, reject) => {
            try {
                const credential = await signInWithPopup(this.auth, authProvider); //NOTE* credential.user.id == this.auth.currentUser.uid
                this.router.navigate(['/rooms']);
                console.log("signed in with google");

                //discover if email/user already exists
                // let userExists = await this.userModel.getUser(credential.user.email);
                let userExists = await this.userModel.getUser(credential.user.uid);
                if (userExists) {
                    //pass
                    console.log("logged in with google, user id already exists in database too.");
                } else {
                    //Is a new user
                    const newUser = await this.userModel.createUser(credential.user); // const result = await this.createUserData(user);
                    // console.log(newUser);
                    console.log("logged in with google, new user.");
                }
                
                resolve(credential);
            } catch (error) {
                reject({
                    result: "failed",
                    error: error,
                })
            }
        })
        
    }
    async register({email, password}: LoginData): Promise<void> {
        let credential;
        try {
            credential = await createUserWithEmailAndPassword(this.auth, email, password)
            this.router.navigate(['/rooms']);
            console.log("registered with email and password");
            
            //create userData
            // this.createUserData(credential.user);
            this.userModel.createUser(credential.user);
        } catch (e) {
            console.log("error1");
            console.log(e.message);
        }
        // return createUserWithEmailAndPassword(this.auth, email, password)
    }
    logout(){
        console.log("logging out");
        // this.authenticationStatus = false;
        if (this.auth.currentUser.isAnonymous){
            this.userModel.deleteUser(this.auth.currentUser.uid);
            console.log("deleting anonymous user");
            return this.auth.currentUser.delete(); //delete() also signsOut();
        }
        return signOut(this.auth);
    }

    async getLoginStatus(): Promise<boolean> {
        //Promises are just an object returned from a function — whether it be a method or not doesn't matter
        return new Promise((resolve, reject) => {
            
            this.auth.onAuthStateChanged(user => {
                if (user) { 
                    console.log("True. Logged in with email: "+user.email) 
                    resolve(true);
                }
                else {
                    console.log("No-user is logged in. Returning false.")//+user.email) 
                    resolve(false);
                    // reject();
                }
            })
        })
    }

    // async subscribeToLoggedInUser(callback){
    //     if (this.isLoggedIn = true){
    //         this.userModel.subscribeToUser(this.currentUser.uid, callback);
    //     }
    // }
}





    // private async syncWithDatabase(user: User){
    //     //sync with firestore. Check if data exists on database
    //     const userData = await this.getUserDataByUid(user.uid);
    //     console.log(`Syncing user.${user.uid} data with database.`);
    //     if (userData){
    //         //is existing user
    //         const result = await this.updateUserData(user);
    //         console.log(result);
            
    //     } else {
    //         //is a new user
    //         const result = await this.createUserData(user);
    //         console.log(result);
    //     }  
    // }

