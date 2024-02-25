import { NgModule } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: "AIzaSyDParxkkyMJLH8-mLJ47qgEezK58AEK3y0",
  authDomain: "library-management-66d2e.firebaseapp.com",
  projectId: "library-management-66d2e",
  storageBucket: "library-management-66d2e.appspot.com",
  messagingSenderId: "1039973986556",
  appId: "1:1039973986556:web:fb45788dd01322bf376779"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
