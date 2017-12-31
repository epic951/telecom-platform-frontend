import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TelecomService } from './telecomservice';
import { DataService } from '../data.service';

@Component({
    selector: 'app-telecomservices',
    templateUrl: './telecomservice-list.component.html',
    styleUrls: ['./telecomservice-list.component.css']
})

export class TelecomServiceListComponent {
    pageTitle = 'Telecom Services List';
    imageWidth = 100;
    imageMargin = 2;
    showImage = false;
    listFilter = 'mu';
    telecomservicesObservable: Observable<TelecomService[]>;

    constructor(private dataService: DataService) {
        this.telecomservicesObservable = this.dataService.get_telecomservices();
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
