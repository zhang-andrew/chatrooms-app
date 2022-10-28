import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//firebase modules (@angular/fire/*)
import { User, Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, doc, docData, getDoc, collection, addDoc, setDoc, updateDoc} from '@angular/fire/firestore';
//interfaces
import { LoginData } from '../interfaces/login-data.interface';
import { UserData } from '../interfaces/user-data.interface';
// import { Observable } from 'rxjs';
//newlyadded modules (sort them)

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // private userCollection: CollectionReference<DocumentData>;
    // private authenticationStatus: boolean = false;
    constructor(private readonly auth: Auth, private readonly router: Router, private readonly db: Firestore){
        console.log("AUTHSERVICE INITIALISED");
    }

    //methods
    async login({email, password}: LoginData): Promise<void> {
        const credential = await signInWithEmailAndPassword(this.auth, email, password);    
        this.router.navigate(['/rooms']);
        console.log("signed in with email and password");

        //sync with firestore. Check if data exists on database, if not create new document, if so update document.
        this.syncWithDatabase(this.auth.currentUser);
    }

    async loginWithGoogle(): Promise<void> {
        //signin with fireauth
        const provider = new GoogleAuthProvider();
        const credential = await signInWithPopup(this.auth, provider); //NOTE* credential.user.id == this.auth.currentUser.uid
        this.router.navigate(['/rooms']);
        console.log("signed in with google");
        
        //sync with firestore. Check if data exists on database, if not create new document, if so update document.
        this.syncWithDatabase(credential.user);
    }

    async register({email, password}: LoginData): Promise<void> {
        let credential;
        try {
            credential = await createUserWithEmailAndPassword(this.auth, email, password)
            this.router.navigate(['/login']);
            console.log("registered with email and password");
            
            //create userData
            this.createUserData(credential.user);
        } catch (e) {
            console.log("error1");
            console.log(e.message);
        }
        // return createUserWithEmailAndPassword(this.auth, email, password)
    }
    logout(){
        console.log("logged out");
        // this.authenticationStatus = false;
        return signOut(this.auth);
    }
    
    // getLoginStatus2(){
    //     // let test: Observable
    //     return new Observable<User>(this.auth.currentUser;)
    // }
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

    private async syncWithDatabase(user: User){
        //sync with firestore. Check if data exists on database
        const userData = await this.getUserDataByUid(user.uid);
        console.log(`Syncing user.${user.uid} data with database.`);
        if (userData){
            //is existing user
            const result = await this.updateUserData(user);
            console.log(result);
            
        } else {
            //is a new user
            const result = await this.createUserData(user);
            console.log(result);
        }  
    }

    
    ///////////////////////
    // MODELS
    ///////////////////////
    //READ
    private async getUserDataByUid(uid: String){
        const userDocumentReference = doc(this.db, `users/${uid}`);
        const docSnap = await getDoc(userDocumentReference);
        if (docSnap.exists()) {
            console.log("Database Document DOES exist")
            return docSnap.data();
        } else {
            console.log("Database Document does NOT exist")
            return undefined;
        }
    }

    //CREATE
    private createUserData(user: UserData){        
        if (user !== null) {
            const userDocumentRef = doc(this.db, `users/${user.uid}`);
            const data = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: false,
            };

            // return updateDoc(userDocumentRef, data)
            // const usersCollection = collection(this.db, 'users');
            console.log("created new userData");
            return setDoc(userDocumentRef, data);;
        }
        return {
            message: "could not CREATE userData."
        };
    }

    //UPDATE
    private updateUserData(user: UserData) {
        //sets user data to firestore on login
        if (user !== null) {
            const userDocumentRef = doc(this.db, `users/${user.uid}`);
            const data = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: false,
            };
            //update any changed fields
            updateDoc(userDocumentRef, data)
            return {
                message: "updated existing userData"
            }
        }
        return {
            message: "could not UPDATE userData."
        };
    }
}
