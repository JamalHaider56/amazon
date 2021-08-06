import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'filterByPlansScreen'})
export class FilterByPlanIdScreen implements PipeTransform {

    transform(trademanagementListPlans : any, entryId: string): any[] {
        if (trademanagementListPlans) {
            return trademanagementListPlans.filter((listing: any) => listing.entriesId === entryId);
        }
    }
}