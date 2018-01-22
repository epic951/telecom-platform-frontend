import { Component, OnInit } from '@angular/core';
import { ITelecomService } from './telecomservice';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: './telecomservice-detail.component.html'
})
export class TelecomServiceDetailComponent implements OnInit {
    pageTitle = 'Telecom Service Details';
    service: ITelecomService;

    constructor(private _router: Router, private _route: ActivatedRoute, private _telecomService: DataService) { }

    ngOnInit(): void {
        const id = +this._route.snapshot.params['id'];
        this.find_service(id);
        this.pageTitle += `: ${id}`;
    }

    find_service(id: number) {
        return this._telecomService.find_telecomservice(id).subscribe(response => this.service = response);
    }

    onBack(): void {
        this._router.navigate(['/services']);
    }

    onEdit(): void {
        this._router.navigate(['/addservice', this.service.telecomServiceId]);
    }
}
