import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Operator } from './operator';
import { DataService } from '../data.service';

@Component({
    selector: 'app-operators',
    templateUrl: './operator-list.component.html',
    styleUrls: ['./operator-list.component.css']
})

export class OperatorListComponent {
    pageTitle = 'Operator List';
    imageWidth = 100;
    imageMargin = 2;
    showImage = false;
    operatorsObservable: Observable<Operator[]>;

    constructor(private dataService: DataService) {
        this.operatorsObservable = this.dataService.get_operators();
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
