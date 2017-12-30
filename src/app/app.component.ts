import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import 'rxjs/add/operator/map';
import { TelecomService } from './telecomservice';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  pageTitle = 'telecom-platform ';
  // operatorsObservable: Observable<Operator[]>;
  // telecomServiceObservable: Observable<TelecomService[]>;
  // products: Product[];

  constructor(private dataService: DataService) {
    // this.dataService.get_products().subscribe((res: Product[]) => {
    //   console.log(res);
    //   this.products = res;
    // });
  }

}


