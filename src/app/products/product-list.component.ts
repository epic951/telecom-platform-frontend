import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './product';
import { DataService } from '../data.service';
import 'rxjs/add/operator/delay';

@Component({
    selector: 'app-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle = 'Product List';
    imageMargin = 2;
    showImage = false;
    listFilter = '';
    productsObservable: Observable<IProduct[]>;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.productsObservable = this.dataService.get_products().delay(250);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Yes the Rating : ' + message;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
