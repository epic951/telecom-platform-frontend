import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    pageTitle = 'Product Details';
    product: IProduct;

    constructor(private _router: Router, private _route: ActivatedRoute, private _productService: DataService) { }

    ngOnInit(): void {
        const id = +this._route.snapshot.params['id'];
        this.find_product(id);
        this.pageTitle += `: ${id}`;
    }

    find_product(id: number) {
        return this._productService.find_product(id).subscribe(response => this.product = response);
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }

    onEdit(): void {
        this._router.navigate(['/addproduct', this.product.productId]);
    }
}
