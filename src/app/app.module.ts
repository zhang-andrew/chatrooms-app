import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//grab environments
import { environment } from '../environments/environment';

//added modules for firebase

import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; // replaces: import { AngularFireModule } from '@angular/fire';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAnalytics } from "firebase/analytics";
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
// import { TopBarComponent } from './shared/components/top-bar.component';
// import { AuthService } from './shared/services/auth.service';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth'; //AuthModule
import { provideAuth, getAuth } from '@angular/fire/auth'; // replaces: import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AuthService } from './shared/services/auth.service';

import { IonicModule, IonIcon } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HeaderComponent } from './shared/components/header.component';

import { SingletonService } from './shared/services/singleton.service';
// import { AuthService } from './shared/services/auth.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { UserLoginComponent } from './_OLD/pages/components/user-login/user-login.component';
// import { UserProfileComponent } from './_OLD/pages/components/user-profile/user-profile.component';
// import { HomeComponent } from './_OLD/pages/home/home.component';
// import { ProfileComponent } from './_OLD/pages/profile/profile.component';
// import { ChatroomComponent } from './_OLD/pages/components/chatroom/chatroom.component';
// import { AdminComponent } from './_OLD/pages/admin/admin.component';
// import { LoginFormComponent } from './_OLD/pages/components/user-login/login-form/login-form.component';
// import { TestComponent } from './test/test.component';

import { HttpClientModule } from '@angular/common/http';


//What is the point of htis file - It is to startup your application, and set the links to your other modules.
//@NgModule takes a metadata object that tells Angular how to compile and launch the application.
//NgModule is a decorator for the exported class AppModule.
@NgModule({
    //Components provided in declarations[]
    declarations: [
        AppComponent,
    ],
    //Modules provided in imports[]
    imports: [
        BrowserModule,
        AppRoutingModule,
        IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        //firebase
        provideFirebaseApp(() => {
            const app = initializeApp(environment.firebaseConfig);
            const analytics = getAnalytics(app);
            return app;
        }),
        provideFirestore(() => getFirestore()),
        provideAuth(() => {
            //get auth instance from AuthService (auth.service.ts)
            const auth = getAuth();
            //provides auth instance to app(NgModule root )
            return auth;
        }),
        // AngularFireAuthModule,
        // TopBarComponent,
        HeaderComponent,
    ],
    //Services provided in providers[], but most services inject themselves into the root.
    providers: [
        // AuthService,
        // AuthService,
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
        // AuthService
        SingletonService,
        // HttpClient, 
        // HttpHa
    ],
    //?i dunno what bootstrap[] is?
    bootstrap: [AppComponent]
}) export class AppModule { }
