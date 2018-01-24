import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
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
    if (temp.toLowerCase().indexOf('etisalat') !== -1) {
        if (opPID.value === null || opPID.value === '') {
            // opPID.setValidators(Validators.required);
            opPID.setErrors({ 'required': true });
        }
    }
    if (temp.toLowerCase().indexOf('orange') !== -1) {
        if (opSID.value === null || opSID.value === '') {
            opSID.setErrors({ 'required': true });
        }
    }
    if (temp.toLowerCase().indexOf('vodafone') !== -1) {
        if (opSID.value === null || opSID.value === '' || opPID.value === null || opPID.value === '') {
            opSID.setErrors({ 'required': true });
            opPID.setErrors({ 'required': true });
        }
    }
    if (temp.toLowerCase().indexOf('etisalat') === -1 && temp.toLowerCase().indexOf('orange') === -1
        && temp.toLowerCase().indexOf('vodafone') === -1) {
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
    telecomService: ITelecomService;
    errorMessage: string;
    telecomServiceNameMsg: string;
    operatorIdMsg: string;
    imageUrlMsg: string;
    ratingMsg: string;
    template: ITelecomService;

    private validationMessages = {
        required: ' value is required.  ',
        pattern: ' you entered is not of a valid format.  ',
        minlength: ' must be at least 3 characters.  ',
        maxlength: ' is limited to a maximum of 30 characters.  ',
        min: ' cannot be lower than 1.  ',
        max: ' cannot be higher than 5.  '
    };

    constructor(private builder: FormBuilder, private router: Router, private _route: ActivatedRoute, private service: DataService) { }

    ngOnInit(): void {
        this.serviceForm = this.builder.group({
            telecomServiceId: [''], telecomServiceName: ['', [Validators.required, Validators.minLength(3),
            Validators.maxLength(30), Validators.pattern('[a-zA-Z\\s]+')]],
            telecomServiceType: 'false',
            operatorId: ['', [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')]],
            operatorGroup: this.builder.group({
                operatorName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30),
                Validators.pattern('[a-zA-Z]+')]],
                operatorServiceId: ['', [Validators.min(1), Validators.pattern('[0-9]+')]],
                operatorPackageId: ['', [Validators.min(1), Validators.pattern('[0-9]+')]]
            }, { validator: operatorIntegrityEnforcer }),
            imageUrl: ['', [Validators.pattern('^((https?|ftp)://)?([A-Za-z]+\\.)?[A-Za-z0-9-]+(\\.[a-zA-Z]{1,4}){1,2}(/.*\\?.*)?$')]],
            rating: ['', [Validators.min(1), Validators.max(5), Validators.pattern('[0-9]+[.]{0,1}[0-9]*')]]
        });

        const controllers = [this.serviceForm.get('telecomServiceName'), this.serviceForm.get('operatorId')
            , this.serviceForm.get('imageUrl'), this.serviceForm.get('rating')];
        const messages = ['telecomServiceNameMsg', 'operatorIdMsg', 'imageUrlMsg', 'ratingMsg'];
        for (let i = 0; i < controllers.length; i++) {
            controllers[i].valueChanges.debounceTime(700)
                .subscribe(value => this.setValidationMessage(controllers[i], messages[i]));
        }

        // const id = +this._route.snapshot.paramMap.get('id');
        const id = +this._route.snapshot.params['id'];
        if (id !== null && id > 0) {
            this.service.find_telecomservice(id)
                .subscribe(response => {
                    this.template = response;
                    this.fillForm();
                });
        }
    }

    setValidationMessage(c: AbstractControl, msg: string): void {
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

    saveService(): void {
        if (this.serviceForm.dirty && this.serviceForm.valid) {
            if (this.serviceForm.get('imageUrl').value === null || this.serviceForm.get('imageUrl').value === '') {
                this.serviceForm.patchValue({ 'imageUrl': 'https://openclipart.org/download/294225/FX13_phone1.svg' });
            }
            // Overwrite the service object values by the form values
            const s = Object.assign({}, this.telecomService, this.formatValues());
            this.service.save_service(s).subscribe(() => this.saveOnComplete(),
                (error: any) => this.errorMessage = <any>error);
        } else if (!this.serviceForm.dirty) {
            this.saveOnComplete();
        }
        console.log('Saved: ' + JSON.stringify(this.serviceForm.value));
    }

    saveOnComplete(): void {
        // Reset the form to clear the flags
        this.serviceForm.reset();
        this.router.navigate(['/services']);
        console.log('Saved: ' + JSON.stringify(this.serviceForm.value));
    }

    formatValues(): string {
        const json = JSON.stringify(this.serviceForm.value);
        const mainData = JSON.parse(json, (key, value) => {
            if (key === 'operatorGroup') {
                key = undefined;
                value = undefined;
            } else if (key === 'imageUrl' && (value === '' || value === null)) {
                value = 'https://openclipart.org/download/22436/nicubunu-Tools.svg';
            }
            return value;
        });
        const groupData = JSON.parse(json)['operatorGroup'];
        const joined = Object.assign({}, mainData, groupData);
        console.log('Joined Data : ' + JSON.stringify(joined));
        return joined;
    }

    onReset(): void {
        this.serviceForm.reset();
    }

    fillForm(): void {
        const temp = +this._route.snapshot.params['id'];
        if (temp !== null && temp > 0) {
            this.serviceForm.get('telecomServiceId').setValue(this.template.telecomServiceId);
            this.serviceForm.get('telecomServiceName').setValue(this.template.telecomServiceName);
            this.serviceForm.get('telecomServiceType').setValue(this.template.telecomServiceType ? 'true' : 'false');
            this.serviceForm.get('operatorId').setValue(this.template.operatorId);
            this.serviceForm.get('operatorGroup.operatorName').setValue(this.template.operatorName);
            this.serviceForm.get('operatorGroup.operatorServiceId').setValue(this.template.operatorServiceId);
            this.serviceForm.get('operatorGroup.operatorPackageId').setValue(this.template.operatorPackageId);
            this.serviceForm.get('imageUrl').setValue(this.template.imageUrl);
            this.serviceForm.get('rating').setValue(this.template.rating);
        }
    }

}
