import { PipeTransform, Pipe } from '@angular/core';
import { IOperator } from './operator';

@Pipe({
    name: 'operatorFilter'
})

export class OperatorFilterPipe implements PipeTransform {
    transform(value: IOperator[], filterBy: string): IOperator[] {
        filterBy = filterBy ? filterBy.toLowerCase() : null;
        return filterBy ? value.filter((operator: IOperator) => operator.operatorName.toLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
