import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from './product';
import { DataService } from './data.service';
import 'rxjs/add/operator/map';
import { Operator } from './operator';
import { TelecomService } from './telecomservice';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'telecom-platform';
  private productsObservable: Observable<Product[]>;
  private operatorsObservable: Observable<Operator[]>;
  private telecomServiceObservable: Observable<TelecomService[]>;

  constructor(private dataService: DataService) {
    this.productsObservable = this.dataService.get_products();
    this.operatorsObservable = this.dataService.get_operators();
    // this.dataService.get_products().subscribe((res: Product[]) => {
    //   console.log(res);
    //   this.products = res;
    // });
  }

}


