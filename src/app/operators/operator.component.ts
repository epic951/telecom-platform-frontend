import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { IOperator } from './operator';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-add-operator',
    templateUrl: './add-operator.html'
})
export class OperatorComponent implements OnInit {
    operatorForm: FormGroup;
    operator: IOperator;
    errorMessage: string;
    operatorNameMsg: string;
    operatorCountryMsg: string;
    imageUrlMsg: string;
    ratingMsg: string;
    template: IOperator;

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
        this.operatorForm = this.builder.group({
            operatorId: [''], operatorName: ['', [Validators.required, Validators.minLength(3),
            Validators.maxLength(30), Validators.pattern('[a-zA-Z\\s]+')]],
            operatorCountry: ['', [Validators.maxLength(35), Validators.pattern('[a-zA-Z]+')]],
            imageUrl: ['', [Validators.pattern('^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$')]],
            rating: ['', [Validators.min(1), Validators.max(5), Validators.pattern('[0-9]+[.]{0,1}[0-9]*')]]
        });

        const controllers = [this.operatorForm.get('operatorName'), this.operatorForm.get('operatorCountry')
            , this.operatorForm.get('imageUrl'), this.operatorForm.get('rating')];
        const messages = ['operatorNameMsg', 'operatorCountryMsg',
            'imageUrlMsg', 'ratingMsg'];
        for (let i = 0; i < controllers.length; i++) {
            controllers[i].valueChanges.debounceTime(700).subscribe(value => this.setValidationMessage(controllers[i], messages[i]));
        }

        const id = +this._route.snapshot.params['id'];
        if (id !== null && id > 0) {
            this.service.find_operator(id)
                .subscribe(response => {
                    this.template = response;
                    this.fillForm();
                });
        }
    }

    setValidationMessage(c: AbstractControl, msg: string): void {
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

    saveOperator(): void {
        if (this.operatorForm.dirty && this.operatorForm.valid) {
            // Overwrite the operator object values by the form values
            const o = Object.assign({}, this.operator, this.operatorForm.value);
            this.service.save_operator(o).subscribe(() => this.saveOnComplete(),
                (error: any) => this.errorMessage = <any>error);
        } else if (!this.operatorForm.dirty) {
            this.saveOnComplete();
        }
        console.log('@Saved: ' + JSON.stringify(this.operatorForm.value));
    }

    saveOnComplete(): void {
        // Reset the form to clear the flags
        this.operatorForm.reset();
        this.router.navigate(['/operators']);
        console.log('%Saved: ' + JSON.stringify(this.operatorForm.value));
    }

    onReset(): void {
        this.operatorForm.reset();
    }

    fillForm(): void {
        const temp = +this._route.snapshot.params['id'];
        if (temp !== null && temp > 0) {
            this.operatorForm.get('operatorId').setValue(this.template.operatorId);
            this.operatorForm.get('operatorName').setValue(this.template.operatorName);
            this.operatorForm.get('operatorCountry').setValue(this.template.operatorCountry);
            this.operatorForm.get('imageUrl').setValue(this.template.imageUrl);
            this.operatorForm.get('rating').setValue(this.template.rating);
        }
    }

}
