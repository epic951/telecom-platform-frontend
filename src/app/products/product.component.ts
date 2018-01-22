import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { IProduct } from './product';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.html'
})
export class ProductComponent implements OnInit {
    productForm: FormGroup;
    product: IProduct;
    errorMessage: string;
    productNameMsg: string;
    productDescriptionMsg: string;
    minPriceMsg: string;
    maxPriceMsg: string;
    imageUrlMsg: string;
    ratingMsg: string;
    template: IProduct;

    private validationMessages = {
        required: ' value is required.  ',
        pattern: ' you entered is not of a valid format.  ',
        minlength: ' must be at least 3 characters.  ',
        maxlength: ' is limited to a maximum of 30 characters.  ',
        min: ' cannot be lower than 0.  ',
        max: ' cannot be higher than 9999.  '
    };

    constructor(private builder: FormBuilder, private router: Router, private _route: ActivatedRoute, private service: DataService) { }

    ngOnInit(): void {
        this.productForm = this.builder.group({
            productName: ['', [Validators.required, Validators.required, Validators.minLength(3),
            Validators.maxLength(30), Validators.pattern('[a-zA-Z\\s]+')]],
            productDescription: ['', Validators.maxLength(35)],
            minPrice: ['', [Validators.min(1), Validators.pattern('[0-9]*[.]{0,1}[0-9]*')]],
            maxPrice: ['', [Validators.max(9999), Validators.pattern('[0-9]*[.]{0,1}[0-9]*')]],
            imageUrl: ['', [Validators.pattern('^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$')]],
            rating: ['', [Validators.min(1), Validators.max(5), Validators.pattern('[0-9]+[.]{0,1}[0-9]*')]]
        });

        const controllers = [this.productForm.get('productName'), this.productForm.get('productDescription'),
        this.productForm.get('minPrice'), this.productForm.get('maxPrice'), this.productForm.get('imageUrl'),
        this.productForm.get('rating')];
        const messages = ['productNameMsg', 'productDescriptionMsg',
            'minPriceMsg', 'maxPriceMsg', 'imageUrlMsg', 'ratingMsg'];
        for (let i = 0; i < controllers.length; i++) {
            controllers[i].valueChanges.debounceTime(700).subscribe(value => this.setValidationMessage(controllers[i], messages[i]));
        }

        const id = +this._route.snapshot.params['id'];
        const temp = this.service.find_product(id)
            .subscribe(response => {
                this.template = response;
                this.fillForm();
            });
    }

    setValidationMessage(c: AbstractControl, msg: string): void {
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

    saveProduct(): void {
        if (this.productForm.dirty && this.productForm.valid) {
            // Overwrite the product object values by the form values
            const p = Object.assign({}, this.product, this.productForm.value);
            this.service.save_product(p).subscribe(() => this.saveOnComplete(),
                (error: any) => this.errorMessage = <any>error);
        } else if (!this.productForm.dirty) {
            this.saveOnComplete();
        }
        console.log('Saved: ' + JSON.stringify(this.productForm.value));
    }

    saveOnComplete(): void {
        // Reset the form to clear the flags
        this.productForm.reset();
        this.router.navigate(['/products']);
        console.log(this.errorMessage);
    }

    onReset(): void {
        this.productForm.reset();
    }

    fillForm(): void {
        const temp = +this._route.snapshot.params['id'];
        console.log(this.template.productName + ' --' + temp + '!!' + this.productForm.get('productName').value);
        if (temp !== null && temp > 0) {
            this.productForm.get('productId').setValue(this.template.productId);
            this.productForm.get('productName').setValue(this.template.productName);
            this.productForm.get('productDescription').setValue(this.template.productDescription);
            this.productForm.get('minPrice').setValue(this.template.minPrice);
            this.productForm.get('maxPrice').setValue(this.template.maxPrice);
            this.productForm.get('imageUrl').setValue(this.template.imageUrl);
            this.productForm.get('rating').setValue(this.template.rating);
        }
    }

}
