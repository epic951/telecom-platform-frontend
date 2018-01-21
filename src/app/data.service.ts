import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from './products/product';
import { IOperator } from './operators/operator';
import { ITelecomService } from './telecomservices/telecomservice';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class DataService {

    baseUrl = 'https://telecom-platform-backend.herokuapp.com/api/';

    // Currently static credentials
    username = 'admin';
    password = 'admin';

    // Base64 encode username/password  **use atob() to decode**
    credentials = btoa(this.username + ':' + this.password);

    // Setup Http Headers
    headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic ' + this.credentials).set('Content-Type', 'application/json');

    constructor(private httpClient: HttpClient) { }

    // product operations
    get_products(): Observable<IProduct[]> {
        return this.httpClient.get<IProduct[]>(this.baseUrl + 'getproducts', { headers: this.headers })
            .do(data => console.log(JSON.stringify(data))).catch(this.handleErrors);
    }

    find_product(id: number): Observable<IProduct> {
        return this.httpClient.get<IProduct>(this.baseUrl + 'findproduct/' + id, { headers: this.headers })
            .do(data => console.log(JSON.stringify(data)));
    }

    save_product(product: IProduct): Observable<IProduct> {
        return this.httpClient.post(this.baseUrl + 'addproduct', product, { headers: this.headers })
            .do(data => console.log(JSON.stringify(data))).catch(this.handleErrors);
    }

    update_product(product: IProduct): Observable<IProduct> {
        console.log('update_product');
        return this.httpClient.put(this.baseUrl + 'updateproduct', product, { headers: this.headers })
            .do(data => console.log(JSON.stringify(data))).catch(this.handleErrors);
    }

    // operator operations
    get_operators(): Observable<IOperator[]> {
        return this.httpClient.get<IOperator[]>(this.baseUrl + 'getoperators', { headers: this.headers })
            .do(data => console.log(JSON.stringify(data))).catch(this.handleErrors);
    }

    find_operator(id: number): Observable<IOperator> {
        return this.httpClient.get<IOperator>(this.baseUrl + 'findoperator/' + id, { headers: this.headers })
            .do(data => console.log(JSON.stringify(data)));
    }

    save_operator(operator: IOperator): Observable<IOperator> {
        return this.httpClient.post(this.baseUrl + 'addoperator', operator, { headers: this.headers })
            .do(data => console.log(JSON.stringify(data))).catch(this.handleErrors);
    }

    // telecomservice operations
    get_telecomservices(): Observable<ITelecomService[]> {
        return this.httpClient.get<ITelecomService[]>(this.baseUrl + 'getservices', { headers: this.headers })
            .do(data => console.log(JSON.stringify(data))).catch(this.handleErrors);
    }

    find_telecomservice(id: number): Observable<ITelecomService> {
        return this.httpClient.get<ITelecomService>(this.baseUrl + 'findservice/' + id, { headers: this.headers })
            .do(data => console.log(JSON.stringify(data)));
    }

    save_service(service: ITelecomService): Observable<ITelecomService> {
        return this.httpClient.post(this.baseUrl + 'addservice', service, { headers: this.headers })
            .do(data => console.log(JSON.stringify(data))).catch(this.handleErrors);
    }

    // error handling
    private handleErrors(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}
