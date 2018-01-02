import { PipeTransform, Pipe } from '@angular/core';
import { ITelecomService } from './telecomservice';

@Pipe({
    name: 'telecomServiceFilter'
})

export class TelecomServiceFilterPipe implements PipeTransform {
    transform(value: ITelecomService[], filterBy: string): ITelecomService[] {
        filterBy = filterBy ? filterBy.toLowerCase() : null;
        return filterBy ? value.filter((telecomservice: ITelecomService) => telecomservice.telecomServiceName.toLowerCase()
            .indexOf(filterBy) !== -1) : value;
    }
}
