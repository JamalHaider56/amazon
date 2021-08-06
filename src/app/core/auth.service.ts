import { AccountSettings} from '../models/tradeJournal';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Journal } from '../models/tradeJournal';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public firedataUsername;
  public firedataUserData;
  public firedataUserPreferences;

  user$: Observable<User>;
  accountSettings$: ReplaySubject<Journal>;

  constructor(public afAuth: AngularFireAuth, public fdb: AngularFireDatabase, private router: Router) {
    this.firedataUsername = this.fdb.database.ref('/usernames');
    this.firedataUserData = this.fdb.database.ref('/users');
    
    // this.firedataUserPreferences = this.fdb.database.ref('/user_tradedata');
    this.accountSettings$ = new ReplaySubject<Journal>(1);

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // Logged in
          this.fdb.object(`user_tradedata/${user.uid}/account_settings/`).valueChanges().pipe(map(settings => {
            this.accountSettings$.next(settings as Journal);
          })).subscribe();

          

          return this.fdb.object(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );

  }

  getUser(): Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async register(value) {
    const displayName = value.fullname;
    const newUser = await firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .catch((error) => {
        throw new Error('The email address is already in use');
      });

    if (newUser) {
      await this.afAuth.auth.currentUser.updateProfile({
        displayName,
        photoURL: 'http://sommmerce.com/assets/images/defaultuser.png'
      });

      const userId = newUser.user.uid;
      this.firedataUsername.child(value.username).set(userId);
      this.firedataUserData.child(userId).set({
        uid: userId,
        displayName,
        userName: value.username,
        email: value.email,
        createdAt: this.timestamp,
        initial: this.getInitials(displayName)
        
      });

      // this.firedataUserPreferences.child(userId).child('tradedata').set(new Trade());
     

      await this.afAuth.auth.currentUser.sendEmailVerification();
    }

    return;
  }

  getInitials(name) {
    const parts = name.split(' ');
    let initials = '';
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== '') {
        initials += parts[i][0];
      }
    }
    return initials;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  checkUsernameExist(userNameId) {
    let username;
    return new Promise((resolve, reject) => {
      this.firedataUsername.child(userNameId).once('value', (snapshot) => {
        username = snapshot.val();
      }).then(() => {
        resolve({ uname: username });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  async login(value) {
    const credential = await firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .catch((error) => { });

    return credential;
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  doForgot(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(value.email)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }
}

 interface User {
  uid: string;
  email: string;
  displayName?: string;
  initial?: string;
  userName: string;
}
