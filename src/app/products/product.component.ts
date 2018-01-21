import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IProduct } from './product';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.html'
})
export class ProductComponent implements OnInit {
    productForm: FormGroup;
    product: IProduct;
    productIdMsg: string;
    productNameMsg: string;
    productDescriptionMsg: string;
    minPriceMsg: string;
    maxPriceMsg: string;
    imageUrlMsg: string;
    ratingMsg: string;

    private validationMessages = {
        required: ' value is required.  ',
        pattern: ' you entered is not of a valid format.  ',
        minlength: ' must be at least 3 characters.  ',
        maxlength: ' is limited to a maximum of 30 characters.  ',
        min: ' cannot be lower than 0.  ',
        max: ' cannot be higher than 9999.  '
    };

    constructor(private builder: FormBuilder) { }

    ngOnInit(): void {
        this.productForm = this.builder.group({
            productId: ['', [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
            productName: ['', [Validators.required, Validators.required, Validators.minLength(3),
            Validators.maxLength(30), Validators.pattern('[a-zA-Z]+')]],
            productDescription: ['', Validators.maxLength(35)],
            minPrice: ['', [Validators.min(0), Validators.pattern('[0-9]*[.]{0,1}[0-9]*')]],
            maxPrice: ['', [Validators.max(9999), Validators.pattern('[0-9]*[.]{0,1}[0-9]*')]],
            imageUrl: ['', [Validators.pattern('^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$')]],
            rating: ['', [Validators.min(1), Validators.max(5), Validators.pattern('[0-9]+[.]{0,1}[0-9]*')]]
        });

        const controllers = [this.productForm.get('productId'),
        this.productForm.get('productName'), this.productForm.get('productDescription'),
        this.productForm.get('minPrice'), this.productForm.get('maxPrice'),
        this.productForm.get('imageUrl'), this.productForm.get('rating')];
        const messages = ['productIdMsg', 'productNameMsg', 'productDescriptionMsg',
            'minPriceMsg', 'maxPriceMsg', 'imageUrlMsg', 'ratingMsg'];
        for (let i = 0; i < controllers.length; i++) {
            controllers[i].valueChanges.debounceTime(700).subscribe(value => this.setValidationMessage(controllers[i], messages[i]));
        }
    }

    setValidationMessage(c: AbstractControl, msg: string): void {
        if (msg === 'productIdMsg') {
            this.productIdMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                console.log('@@');
                this.productIdMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
            }
        }
        if (msg === 'productNameMsg') {
            this.productNameMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                this.productNameMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
            }
        }
        if (msg === 'productDescriptionMsg') {
            this.productDescriptionMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                this.productDescriptionMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
            }
        }
        if (msg === 'minPriceMsg') {
            this.minPriceMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                this.minPriceMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
            }
        }
        if (msg === 'maxPriceMsg') {
            this.maxPriceMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                this.maxPriceMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
            }
        }
        if (msg === 'imageUrlMsg') {
            this.imageUrlMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                this.imageUrlMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
            }
        }
        if (msg === 'ratingMsg') {
            this.ratingMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                this.ratingMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
            }
        }
    }

    save(): void {
        console.log(this.productForm);
        console.log('Saved: ' + JSON.stringify(this.productForm.value));
    }

}
