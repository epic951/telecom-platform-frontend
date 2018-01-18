import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { IOperator } from './operator';

@Component({
    templateUrl: './operator-detail.component.html'
})
export class OperatorDetailComponent implements OnInit {
    pageTitle = 'Operator Details';
    operator: IOperator;

    constructor(private _router: Router, private _route: ActivatedRoute, private _operatorService: DataService) { }

    ngOnInit(): void {
        const id = +this._route.snapshot.params['id'];
        this.find_operator(id);
        this.pageTitle += `: ${id}`;
    }

    find_operator(id: number) {
        return this._operatorService.find_operator(id).subscribe(response => this.operator = response);
    }

    onBack(): void {
        this._router.navigate(['/operators']);
    }
}
