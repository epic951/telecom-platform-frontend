import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './product';
import { DataService } from '../data.service';

@Component({
    selector: 'app-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle = 'Product List';
    imageWidth = 100;
    imageMargin = 2;
    showImage = false;
    listFilter = '';
    productsObservable: Observable<IProduct[]>;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.productsObservable = this.dataService.get_products();
        // this.productsObservable.subscribe(res => console.log(res));
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
