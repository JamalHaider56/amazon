import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'filterByEntriesScreen'})
export class FilterByEntryIdScreen implements PipeTransform {

    transform(trademanagementListEntries : any, entryId: string): any[] {
        if (trademanagementListEntries) {
            return trademanagementListEntries.filter((listing: any) => listing.entriesId === entryId);
        }
    }
}