import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IOperator } from './operator';
import { DataService } from '../data.service';
import 'rxjs/add/operator/delay';

@Component({
    selector: 'app-operators',
    templateUrl: './operator-list.component.html',
    styleUrls: ['./operator-list.component.css']
})

export class OperatorListComponent implements OnInit {
    pageTitle = 'Operator List';
    imageMargin = 2;
    showImage = false;
    listFilter = '';
    operatorsObservable: Observable<IOperator[]>;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.operatorsObservable = this.dataService.get_operators().delay(500);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Yes the Rating : ' + message;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
