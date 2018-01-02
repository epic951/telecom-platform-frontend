import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { OperatorListComponent } from './operators/operator-list.component';
import { TelecomServiceListComponent } from './telecomservices/telecomservice-list.component';
import { OperatorFilterPipe } from './operators/operator-filter.pipe';
import { TelecomServiceFilterPipe } from './telecomservices/telecomservice-filter.pipe';
import { ProductFilterPipe } from './products/product-filter.pipe';

@NgModule({
  declarations: [
    AppComponent, ProductListComponent, OperatorListComponent, TelecomServiceListComponent, OperatorFilterPipe,
    TelecomServiceFilterPipe, ProductFilterPipe
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
