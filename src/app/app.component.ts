import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  pageTitle = 'Telecom-Platform ';

  constructor(private dataService: DataService) {
    // this.dataService.get_products().subscribe((res: Product[]) => {
    //   console.log(res);
    //   this.products = res;
    // });
  }

}


