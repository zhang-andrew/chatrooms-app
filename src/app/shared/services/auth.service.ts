// import { Injectable } from '@angular/core';
// import { FirebaseAuthState } from '@angular/fire/app';

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthService {

//     //varName: interface = value;
//     authState: FirebaseAuthState = null;

//     constructor() { }
// }


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';

import * as auth from 'firebase/auth'; // import { auth } from 'firebase/app';

// import { auth } from '@angular/fire';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { LoginData } from '../interfaces/login-data.interface';

// import { Observable, of, switchMap } from 'rxjs';




@Injectable({
    providedIn: 'root',
})
export class AuthService {
    //the $ suffix is used to indicate that the variable is an "Observable" subject. "Observers" will look at these subjects for changes.
    // user$: Observable<User> | null | undefined;

    userData!: any; // Save logged in user data
    constructor(
        private auth: Auth,
        private afAuth: AngularFireAuth, // Inject Firebase auth service
        private db: AngularFirestore, // Inject Firestore service
        // public ngZone: NgZone // NgZone service to remove outside scope warning
        public router: Router,) {
        // this.user$ = this.afAuth.authState.pipe(
        //     switchMap(user => {
        //         if (user){
        //             return this.db.collection<User>(`users/${user.uid}`).valueChanges();
        //         } else {
        //             return [];
        //         }
        //     })
        // );

        /* Saving user data in localstorage when 
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe((result) => {
            if (result) {
                this.userData = result;
                // localStorage.setItem('user', JSON.stringify(this.userData));
                // JSON.parse(localStorage.getItem('user')!);
                console.log("logged in");
            } else {
                // localStorage.setItem('user', 'null');
                // JSON.parse(localStorage.getItem('user')!);
                this.userData = null;
                console.log("not logged in");
            }
        });
        // console.log(this.userData);
        // this.userData = "test";
        console.log(this.afAuth.authState);


    }

    login({email, password}: LoginData){
        return signInWithEmailAndPassword(this.auth, email, password);
    }
    register({email, password}: LoginData){
        return createUserWithEmailAndPassword(this.auth, email, password)
    }
    logout(){
        return signOut(this.auth);
    }
    

    async googleSignin() {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.signInWithPopup(provider);
        // firebase.auth.
        return this.updateUserData(credential.user);
    }

    async signOut() {
        await this.afAuth.signOut();
        // return this.router.navigate(['/']);
        console.log("LOGGED OUT");

    }
    private updateUserData(user: User) {
        //sets user data to firestore on login
        if (user !== null) {
            const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);

            const data = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: false,
            };

            //normally set will destroy and recreate the document. the merge option set to true will only change any new existing data.
            return userRef.set(data, { merge: true });
        }
        return {
            message: "error"
        };
    }

    getAuthStatus() {
        //getAuth() returns the current state of the firebase client otherwise returns null.
        console.log(getAuth());
        const auth = getAuth();
        console.log(auth.currentUser);
        
        
        let loggedInStatus: boolean = auth.currentUser !== null ? true : false;
        console.log("this happened"+loggedInStatus);
        return loggedInStatus;
    }
}

//     //OLD
//     // Sign in with email/password
//     SignIn(email: string, password: string) {
//         return this.afAuth
//             .signInWithEmailAndPassword(email, password)
//             .then((result) => {
//                 this.SetUserData(result.user);
//                 this.afAuth.authState.subscribe((user) => {
//                     if (user) {
//                         this.router.navigate(['dashboard']);
//                     }
//                 });
//             })
//             .catch((error) => {
//                 window.alert(error.message);
//             });
//     }
//     // Sign up with email/password
//     SignUp(email: string, password: string) {
//         return this.afAuth
//             .createUserWithEmailAndPassword(email, password)
//             .then((result) => {
//                 /* Call the SendVerificaitonMail() function when new user sign 
//                 up and returns promise */
//                 this.SendVerificationMail();
//                 this.SetUserData(result.user);
//             })
//             .catch((error) => {
//                 window.alert(error.message);
//             });
//     }
//     // Send email verfificaiton when new user sign up
//     SendVerificationMail() {
//         return this.afAuth.currentUser
//             .then((u: any) => u.sendEmailVerification())
//             .then(() => {
//                 this.router.navigate(['verify-email-address']);
//             });
//     }
//     // Reset Forggot password
//     ForgotPassword(passwordResetEmail: string) {
//         return this.afAuth
//             .sendPasswordResetEmail(passwordResetEmail)
//             .then(() => {
//                 window.alert('Password reset email sent, check your inbox.');
//             })
//             .catch((error) => {
//                 window.alert(error);
//             });
//     }
//     // Returns true when user is looged in and email is verified
//     get isLoggedIn(): boolean {
//         const user = JSON.parse(localStorage.getItem('user')!);
//         return user !== null && user.emailVerified !== false ? true : false;
//     }
//     // Sign in with Google
//     GoogleAuth() {
//         return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
//             this.router.navigate(['dashboard']);
//         });
//     }
//     // Auth logic to run auth providers
//     AuthLogin(provider: any) {
//         return this.afAuth
//             .signInWithPopup(provider)
//             .then((result) => {
//                 this.router.navigate(['dashboard']);
//                 this.SetUserData(result.user);
//             })
//             .catch((error) => {
//                 window.alert(error);
//             });
//     }
//     /* Setting up user data when sign in with username/password, 
//     sign up with username/password and sign in with social auth  
//     provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
//     SetUserData(user: any) {
//         // const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
//         const userRef = this.db.doc(
//             `users/${user.uid}`
//         );
//         const userData: User = {
//             uid: user.uid,
//             email: user.email,
//             displayName: user.displayName,
//             // photoURL: user.photoURL,
//             emailVerified: user.emailVerified,
//         };
//         return userRef.set(userData, {
//             merge: true,
//         });
//     }
//     // Sign out
//     SignOut() {
//         return this.afAuth.signOut().then(() => {
//             localStorage.removeItem('user');
//             this.router.navigate(['sign-in']);
//         });
//     }
// }