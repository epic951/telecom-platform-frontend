import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ITelecomService } from './telecomservice';
import { DataService } from '../data.service';
import 'rxjs/add/operator/delay';

@Component({
    selector: 'app-telecomservices',
    templateUrl: './telecomservice-list.component.html',
    styleUrls: ['./telecomservice-list.component.css']
})

export class TelecomServiceListComponent implements OnInit {
    pageTitle = 'Telecom Services List';
    imageMargin = 2;
    showImage = false;
    listFilter = '';
    telecomservicesObservable: Observable<ITelecomService[]>;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.telecomservicesObservable = this.dataService.get_telecomservices().delay(250);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Yes the Rating : ' + message;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
