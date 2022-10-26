import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';

//grab environments
import { environment } from '../environments/environment';

//added modules for firebase
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; //AuthModule
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; // replaces: import { AngularFireModule } from '@angular/fire';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { provideAuth, getAuth } from '@angular/fire/auth'; // replaces: import { AngularFireAuthModule } from '@angular/fire/auth';
import { getAnalytics } from "firebase/analytics";

import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';


//What is the point of htis file - It is to startup your application, and set the links to your other modules.
//@NgModule takes a metadata object that tells Angular how to compile and launch the application.
//NgModule is a decorator for the exported class AppModule.
@NgModule({
    //Components provided in declarations[]
    declarations: [
        AppComponent,
        UserLoginComponent,
        UserProfileComponent,
        HomeComponent,
        ProfileComponent,
        ChatroomComponent
    ],
    //Modules provided in imports[]
    imports: [
        BrowserModule,
        AppRoutingModule,
        // HttpClientModule,
        //firebase
        provideFirebaseApp(() => {
            const app = initializeApp(environment.firebaseConfig);
            const analytics = getAnalytics(app);
            return app;
        }),
        provideFirestore(() => getFirestore()),
        provideAuth(() => {
            const auth = getAuth();
            return auth;
        }),
        AngularFireAuthModule,
    ],
    //Services provided in providers[], but most services inject themselves into the root.
    providers: [],
    //?i dunno what bootstrap[] is?
    bootstrap: [AppComponent]
}) export class AppModule { }
