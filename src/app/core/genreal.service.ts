import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
private currentUserId;
public shareUserCollection
public collectionName:string 


tradegeneralRef = firebase.firestore().collection('tradingjournal');
  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth, private http: HttpClient) {
    this.currentUserId=this.afAuth.auth.currentUser.uid;

     //this.ab= this.ref.doc(this.currentUserId).collection('tradeJournalNotes_plan');
   }
  
//   getBoard(id: string): Observable<any> {
//     return new Observable((observer) => {
//       this.ref.doc(this.afAuth.auth.currentUser.uid).collection('tradeJournalNotes_plan').doc(id).get().then((doc) => {
//         let data = doc.data();
//         observer.next({
//           key: doc.id,
//           title: data.title
//         });
//       });
//     });
//   }
  
postPinData(data,collectionName): Observable<any> {
    return new Observable((observer) => {
        this.tradegeneralRef.doc(this.afAuth.auth.currentUser.uid).collection(collectionName).add(data).then((doc) => {
        observer.next({
          
        });
      });
    });
  }

  postNotePinData(data,collectionName): Observable<any> {
    return new Observable((observer) => {
        this.tradegeneralRef.doc(this.afAuth.auth.currentUser.uid).collection(collectionName).add(data).then((doc) => {
            observer.next({
          
            });
      });
    });
  }

  postData(data,collectionName): Observable<any> {
    return new Observable((observer) => {
        this.tradegeneralRef.doc(this.afAuth.auth.currentUser.uid).collection(collectionName).add(data).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }
  
  updateData(id: string, data,collectionName): Observable<any> {
    return new Observable((observer) => {
        this.tradegeneralRef.doc(this.afAuth.auth.currentUser.uid).collection(collectionName).doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }
  
  deleteData(id: string, collectionName): Observable<{}> {
    return new Observable((observer) => {
        this.tradegeneralRef.doc(this.afAuth.auth.currentUser.uid).collection(collectionName).doc(id).delete().then(() => {
        observer.next();
      });
    });
  }

binanceData(): Observable<any>{
  const headers = new HttpHeaders().
    set('Content-Type', 'application/json').
    set('Accept', 'application/json').
    set('Access-Control-Allow-Headers', 'Content-Type').
    set('Access-Control-Allow-Origin', '*');

  const path = 'https://api.binance.com/api/v1/exchangeInfo';
  return this.http.get(path, {headers: headers})

}

  
  // Task Service

//   postTasks(data): Observable<any> {
//     return new Observable((observer) => {
//       this.ref.doc(this.afAuth.auth.currentUser.uid).collection('tradeJournalBox_Task').add(data).then((doc) => {
//         observer.next({
//           key: doc.id,
//         });
//       });
//     });
//   }
}
