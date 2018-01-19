import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IOperator } from './operator';

@Component({
    selector: 'app-add-operator',
    templateUrl: './add-operator.html'
})
export class OperatorComponent implements OnInit {
    operatorForm: FormGroup;
    operator: IOperator;

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
    }

    save(): void {
        console.log(this.operatorForm);
        console.log('Saved: ' + JSON.stringify(this.operatorForm.value));
    }

}
