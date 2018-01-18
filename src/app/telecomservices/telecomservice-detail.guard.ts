import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class TelecomServiceDetailGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid Telecom Service ID');
            this._router.navigate(['/services']);
            return false;
        }
        return true;
    }
}
