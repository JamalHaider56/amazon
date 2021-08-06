import * as firebase from 'firebase/app';

export class TradePlans {
    id: string
    planAssetPair?:[];
    planLeverage? : number;
    planEntry?: number;
    createdAt? :any;
    planProfit?:number;
    planAmout? : number;
    planStopLose?: number;
    planTotal? : number;
    planNote?:string;

    plantags?: [];
    
  }

  export class PlanAssetPairs {
    Title?: string;
  }
  
  export class PlanTags {
    Title?: string;
    selected:boolean = false;
  }
  
  
  export class PlanScreenShoot {
    id: string
    entriesId?: string;
    
    createdAt :any;
    path?:string;
    imageUrl:any;
  }