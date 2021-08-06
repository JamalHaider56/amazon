import { Pipe, PipeTransform } from '@angular/core';
import { TradeManagement } from './tradeEntries';
@Pipe({name: 'filterByEntries'})
export class FilterByEntryId implements PipeTransform {

    transform(trademanagementList : any, entryId: string): any[] {
        if (trademanagementList) {
         
          var list  = trademanagementList.filter((listing: any) => listing.entriesId === entryId);
          if(!list?.length){
          list = [{

            entriesId: entryId,
            noteTitle: "",
            }];
          }
          return list
        }
        else{
          list = [{

            entriesId: entryId,
            noteTitle: "",
            }];
          }
          return list
        
    }
}