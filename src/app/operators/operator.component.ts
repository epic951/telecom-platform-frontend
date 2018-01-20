import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IOperator } from './operator';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-add-operator',
    templateUrl: './add-operator.html'
})
export class OperatorComponent implements OnInit {
    operatorForm: FormGroup;
    operator: IOperator;
    operatorIdMsg: string;
    operatorNameMsg: string;
    operatorCountryMsg: string;
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
        this.operatorForm = this.builder.group({
            operatorId: ['', [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
            operatorName: ['', [Validators.required, Validators.minLength(3),
            Validators.maxLength(30), Validators.pattern('[a-zA-Z]+')]],
            operatorCountry: ['', [Validators.maxLength(35), Validators.pattern('[a-zA-Z]+')]],
            imageUrl: ['', [Validators.pattern('^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$')]],
            rating: ['', [Validators.min(1), Validators.max(5), Validators.pattern('[0-9]+[.]{0,1}[0-9]*')]]
        });

        const controllers = [this.operatorForm.get('operatorId'),
        this.operatorForm.get('operatorName'), this.operatorForm.get('operatorCountry'),
        this.operatorForm.get('imageUrl'), this.operatorForm.get('rating')];
        const messages = ['operatorIdMsg', 'operatorNameMsg', 'operatorCountryMsg',
            'imageUrlMsg', 'ratingMsg'];
        for (let i = 0; i < controllers.length; i++) {
            controllers[i].valueChanges.debounceTime(1000).subscribe(value => this.setValidationMessage(controllers[i], messages[i]));
        }
    }

    setValidationMessage(c: AbstractControl, msg: string): void {
        if (msg === 'operatorIdMsg') {
            this.operatorIdMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                console.log('@@');
                this.operatorIdMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
            }
        }
        if (msg === 'operatorNameMsg') {
            this.operatorNameMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                this.operatorNameMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
            }
        }
        if (msg === 'operatorCountryMsg') {
            this.operatorCountryMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                this.operatorCountryMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
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
        console.log(this.operatorForm);
        console.log('Saved: ' + JSON.stringify(this.operatorForm.value));
    }

}
