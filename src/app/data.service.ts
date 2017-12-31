import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from './products/product';
import { Operator } from './operators/operator';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TelecomService } from './telecomservices/telecomservice';

@Injectable()
export class DataService {

    baseUrl = 'https://telecom-platform.herokuapp.com/api/get';

    // Currently static credentials
    username = 'admin';
    password = 'admin';

    // Base64 encode username/password  **use atob() to decode**
    credentials = btoa(this.username + ':' + this.password);

    // Setup Http Headers
    headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic ' + this.credentials).set('Content-Type', 'application/json');
    constructor(private httpClient: HttpClient) {

    }

    get_products(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.baseUrl + 'products', { headers: this.headers });
    }

    get_operators(): Observable<Operator[]> {
        return this.httpClient.get<Operator[]>(this.baseUrl + 'operators', { headers: this.headers });
    }

    get_telecomservices(): Observable<TelecomService[]> {
        return this.httpClient.get<TelecomService[]>(this.baseUrl + 'services', { headers: this.headers });
    }

}
