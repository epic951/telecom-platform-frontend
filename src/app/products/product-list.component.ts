import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from './product';
import { DataService } from '../data.service';

@Component({
    selector: 'app-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent {
    pageTitle = 'Product List';
    productsObservable: Observable<Product[]>;

    constructor(private dataService: DataService) {
        this.productsObservable = this.dataService.get_products();
    }
}
