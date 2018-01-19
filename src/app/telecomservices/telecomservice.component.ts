import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ITelecomService } from './telecomservice';

function operatorIntegrityEnforcer(c: AbstractControl): { [key: string]: boolean } | null {
    const opName = c.get('operatorName');
    const opSID = c.get('operatorServiceId');
    const opPID = c.get('operatorPackageId');
    const temp = opName.value;
    if (opName.pristine) {
        return null;
    }
    if (temp.toLowerCase() === 'etisalat') {
        console.log('etisalat');
        if (opPID.value === null || opPID.value === '') {
            console.log('&&');
            // opPID.setValidators(Validators.required);
            opPID.setErrors({ 'required': true });
        }
    }
    if (temp.toLowerCase() === 'orange') {
        console.log('orange');
        if (opSID.value === null || opSID.value === '') {
            opSID.setErrors({ 'required': true });
        }
    }
    if (temp.toLowerCase() === 'vodafone') {
        console.log('orange');
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
    console.log('validated !');
    return null;
}

@Component({
    selector: 'app-add-service',
    templateUrl: './add-service.html'
})
export class TelecomServiceComponent implements OnInit {
    serviceForm: FormGroup;
    service: ITelecomService;

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
    }

    save(): void {
        console.log(this.serviceForm);
        console.log('Saved: ' + JSON.stringify(this.serviceForm.value));
    }

}
