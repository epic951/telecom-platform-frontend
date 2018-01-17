import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { OperatorListComponent } from './operators/operator-list.component';
import { TelecomServiceListComponent } from './telecomservices/telecomservice-list.component';
import { OperatorFilterPipe } from './operators/operator-filter.pipe';
import { TelecomServiceFilterPipe } from './telecomservices/telecomservice-filter.pipe';
import { ProductFilterPipe } from './products/product-filter.pipe';
import { StarComponent } from './shared/star.component';
import { WelcomeComponent } from './home/welcome.component';

@NgModule({
  declarations: [
    AppComponent, ProductListComponent, OperatorListComponent, TelecomServiceListComponent, OperatorFilterPipe,
    TelecomServiceFilterPipe, ProductFilterPipe, StarComponent, WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [{ path: 'products', component: ProductListComponent },
      { path: 'operators', component: OperatorListComponent },
      { path: 'services', component: TelecomServiceListComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
