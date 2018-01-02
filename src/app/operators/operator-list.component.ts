import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IOperator } from './operator';
import { DataService } from '../data.service';

@Component({
    selector: 'app-operators',
    templateUrl: './operator-list.component.html',
    styleUrls: ['./operator-list.component.css']
})

export class OperatorListComponent implements OnInit {
    pageTitle = 'Operator List';
    imageWidth = 100;
    imageMargin = 2;
    showImage = false;
    listFilter = '';
    operatorsObservable: Observable<IOperator[]>;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.operatorsObservable = this.dataService.get_operators();
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
