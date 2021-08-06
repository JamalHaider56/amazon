import * as firebase from 'firebase/app';

export class Journal {
    id?: string = "";
    title?: string;
    createdAt?: any;
    // constructor() {
    //   this.createdAt = this.timestamp
    // }
    // get timestamp() {
    //   return firebase.database.ServerValue.TIMESTAMP;
    // }
  }

export class Notes {
    id: string
    journalId?: string;
    noteTitle?: string;
    tags?: [];
    createdAt :any;
    pinTag : boolean = false;
    description?: string = "";
  }

  export class Notes1 {
    id: string
    journalId?: string;
    noteTitle?: string;
    tags?: [];
    createdAt :any;
    pinTag : boolean = false;
    description?: string = "";
  }

  export class Pins {
    id: string
    journalId?: string;
    noteTitle?: string;
    tags?: [];
    createdAt :any
 
  
  }
  
  export class Description {
    id: string
    noteId?: string;
    description?: string;
    createdAt?: any;
    path?:string;
    imageUrl:any;
    
  }
  
  export class Tags {
    Title?: string;
    selected:boolean = false;
  }
  
  export class AccountSettings {
    bgColor: string;
    exchange: string;
    pairs: string;
    isWatchlistActive: boolean;
    watchlist: [string];
  
    constructor() {
      this.bgColor = 'white';
      this.exchange = 'binance';
      this.pairs = 'ALL';
      this.isWatchlistActive = false;
      this.watchlist = null;
    }
  }

