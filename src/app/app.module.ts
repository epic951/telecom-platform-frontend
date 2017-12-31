import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { OperatorListComponent } from './operators/operator-list.component';
import { TelecomServiceListComponent } from './telecomservices/telecomservice-list.component';

@NgModule({
  declarations: [
    AppComponent, ProductListComponent, OperatorListComponent, TelecomServiceListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
