import { Pipe, PipeTransform } from '@angular/core';
import { TradeManagement } from './tradeEntries';
@Pipe({name: 'filterEntryPlanShow'})
export class FilterEntryPlanShow implements PipeTransform {

  transform(trademanagementList1 : any, planId: string): any[] {
    if (trademanagementList1) {
     
      var list  = trademanagementList1.filter((item: any) => item.id === planId);
      if(!list?.length){
      list = [{

        planId: planId,
        
        }];
      }
      return list
    }
}
}