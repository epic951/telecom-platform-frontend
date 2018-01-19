import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduct } from './product';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.html'
})
export class ProductComponent implements OnInit {
    productForm: FormGroup;
    product: IProduct;

    constructor(private builder: FormBuilder) { }

    ngOnInit(): void {
        this.productForm = this.builder.group({
            productId: ['', [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
            productName: ['', [Validators.required, Validators.required, Validators.minLength(3),
            Validators.maxLength(30), Validators.pattern('[a-zA-Z]+')]],
            productDescription: ['', Validators.maxLength(35)],
            minPrice: ['', [Validators.min(0), Validators.pattern('[0-9]*[.]{1}[0-9]*')]],
            maxPrice: ['', [Validators.max(9999), Validators.pattern('[0-9]*[.]{1}[0-9]*')]],
            imageUrl: ['', [Validators.pattern('^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$')]],
            rating: ['', [Validators.min(1), Validators.max(5), Validators.pattern('[0-9]+[.]{0,1}[0-9]*')]]
        });
    }

    save(): void {
        console.log(this.productForm);
        console.log('Saved: ' + JSON.stringify(this.productForm.value));
    }

}
