import * as firebase from 'firebase/app';

export class TradeEntries {
    id: string
    leverage? : number
    avgEntrytPrice?: number;
    tags?: [];
    createdAt? :any;
    stopLose?: number;
    amout? : number;
    avgClosePrice? : number;
    total? : number;
    fees? : number;
    assetPair?:[];
    tradeManagement:TradeManagement[];

    planId : string;
  }

  export class TradeManagement {
    id: string
    entriesId?: string;
    noteTitle?: string;
    entryTags?: [];
    exitTags?: [];
    createdAt :any;
    path?:string;
    imageUrl:any;
  }

  export class TradeScreenShoot {
    id: string
    entriesId?: string;
    
    createdAt :any;
    path?:string;
    imageUrl:any;
  }
  export class EntryTags {
    Title?: string;
    selected:boolean = false;
  }

  export class ExitTags {
    Title?: string;
    selected:boolean = false;
  }

  export class AssetPairs {
    Title?: string;
  }
  