import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { IProduct } from './products/product';
import { IOperator } from './operators/operator';
import { ITelecomService } from './telecomservices/telecomservice';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class DataService {

    baseUrl = 'https://telecom-platform-backend.herokuapp.com/api/get';

    // Currently static credentials
    username = 'admin';
    password = 'admin';

    // Base64 encode username/password  **use atob() to decode**
    credentials = btoa(this.username + ':' + this.password);

    // Setup Http Headers
    headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic ' + this.credentials).set('Content-Type', 'application/json');
    constructor(private httpClient: HttpClient) { }

    get_products(): Observable<IProduct[]> {
        return this.httpClient.get<IProduct[]>(this.baseUrl + 'products', { headers: this.headers })
            .do(data => console.log(JSON.stringify(data))).catch(this.handleErrors);
    }

    get_operators(): Observable<IOperator[]> {
        return this.httpClient.get<IOperator[]>(this.baseUrl + 'operators', { headers: this.headers })
            .do(data => console.log(JSON.stringify(data))).catch(this.handleErrors);
    }

    get_telecomservices(): Observable<ITelecomService[]> {
        return this.httpClient.get<ITelecomService[]>(this.baseUrl + 'services', { headers: this.headers })
            .do(data => console.log(JSON.stringify(data))).catch(this.handleErrors);
    }

    private handleErrors(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}
