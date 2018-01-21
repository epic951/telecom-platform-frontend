import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ITelecomService } from './telecomservice';
import 'rxjs/add/operator/debounceTime';

function operatorIntegrityEnforcer(c: AbstractControl): { [key: string]: boolean } | null {
    const opName = c.get('operatorName');
    const opSID = c.get('operatorServiceId');
    const opPID = c.get('operatorPackageId');
    const temp = opName.value;
    if (opName.pristine) {
        return null;
    }
    if (temp.toLowerCase() === 'etisalat') {
        if (opPID.value === null || opPID.value === '') {
            // opPID.setValidators(Validators.required);
            opPID.setErrors({ 'required': true });
        }
    }
    if (temp.toLowerCase() === 'orange') {
        if (opSID.value === null || opSID.value === '') {
            opSID.setErrors({ 'required': true });
        }
    }
    if (temp.toLowerCase() === 'vodafone') {
        if (opSID.value === null || opSID.value === '' || opPID.value === null || opPID.value === '') {
            opSID.setErrors({ 'required': true });
            opPID.setErrors({ 'required': true });
        }
    }
    if (temp.toLowerCase() !== 'etisalat' && temp.toLowerCase() !== 'orange' && temp.toLowerCase() !== 'vodafone') {
        if (opPID.value === null || opPID.value === '') {
            opPID.setErrors(null);
            opSID.setErrors(null);
        }
    }
    return null;
}

@Component({
    selector: 'app-add-service',
    templateUrl: './add-service.html'
})
export class TelecomServiceComponent implements OnInit {
    serviceForm: FormGroup;
    service: ITelecomService;
    telecomServiceIdMsg: string;
    telecomServiceNameMsg: string;
    operatorIdMsg: string;
    imageUrlMsg: string;
    ratingMsg: string;

    private validationMessages = {
        required: ' value is required.  ',
        pattern: ' you entered is not of a valid format.  ',
        minlength: ' must be at least 3 characters.  ',
        maxlength: ' is limited to a maximum of 30 characters.  ',
        min: ' cannot be lower than 1.  ',
        max: ' cannot be higher than 5.  '
    };

    constructor(private builder: FormBuilder) { }

    ngOnInit(): void {
        this.serviceForm = this.builder.group({
            telecomServiceId: ['', [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
            telecomServiceName: ['', [Validators.required, Validators.minLength(3),
            Validators.maxLength(30), Validators.pattern('[a-zA-Z]+')]],
            telecomServiceType: 'subscription',
            operatorId: ['', [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
            operatorGroup: this.builder.group({
                operatorName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30),
                Validators.pattern('[a-zA-Z]+')]],
                operatorServiceId: ['', [Validators.min(0), Validators.pattern('[0-9]+')]],
                operatorPackageId: ['', [Validators.min(0), Validators.pattern('[0-9]+')]]
            }, { validator: operatorIntegrityEnforcer }),
            imageUrl: ['', [Validators.pattern('^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$')]],
            rating: ['', [Validators.min(1), Validators.max(5), Validators.pattern('[0-9]+[.]{0,1}[0-9]*')]]
        });

        const controllers = [this.serviceForm.get('telecomServiceId'),
        this.serviceForm.get('telecomServiceName'), this.serviceForm.get('operatorId'),
        this.serviceForm.get('imageUrl'), this.serviceForm.get('rating')];
        const messages = ['telecomServiceIdMsg', 'telecomServiceNameMsg', 'operatorIdMsg', 'imageUrlMsg', 'ratingMsg'];
        for (let i = 0; i < controllers.length; i++) {
            controllers[i].valueChanges.debounceTime(700).subscribe(value => this.setValidationMessage(controllers[i], messages[i]));
        }
    }

    setValidationMessage(c: AbstractControl, msg: string): void {
        if (msg === 'telecomServiceIdMsg') {
            this.telecomServiceIdMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                console.log('@@');
                this.telecomServiceIdMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
            }
        }
        if (msg === 'telecomServiceNameMsg') {
            this.telecomServiceNameMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                this.telecomServiceNameMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
            }
        }
        if (msg === 'operatorIdMsg') {
            this.operatorIdMsg = '';
            if ((c.touched || c.dirty) && c.errors) {
                this.operatorIdMsg = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
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
        console.log(this.serviceForm);
        console.log('Saved: ' + JSON.stringify(this.serviceForm.value));
    }

}
