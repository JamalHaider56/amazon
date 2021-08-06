import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Journal } from '../models/tradeJournal'

@Injectable({
  providedIn: 'root'
})
export class CommonSeriveService {
  private currentUserId;
  public shareUserCollection
  public ab
  ref = firebase.firestore().collection('tradingjournal');
  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth,) {
    this.currentUserId = this.afAuth.auth.currentUser.uid;

    // this.ab= this.ref.doc(this.currentUserId).collection('tradeJournalNotes_plan');
  }

  getBoard(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(this.afAuth.auth.currentUser.uid).collection('tradeJournalNotes_plan').doc(id).get().then((doc) => {
        let data = doc.data();
        observer.next({
          key: doc.id,
          title: data.title
        });
      });
    });
  }

  postBoards(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(this.afAuth.auth.currentUser.uid).collection('tradeJournalNotes_plan').add(data).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }

  updateBoards(id: string, data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(this.afAuth.auth.currentUser.uid).collection('tradeJournalNotes_plan').doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }

  deleteBoards(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.ref.doc(this.afAuth.auth.currentUser.uid).collection('tradeJournalNotes_plan').doc(id).delete().then(() => {
        observer.next();
      });
    });
  }


  // Task Service

  postTasks(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(this.afAuth.auth.currentUser.uid).collection('tradeJournalBox_Task').add(data).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }
}
