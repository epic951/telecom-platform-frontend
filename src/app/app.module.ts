import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ProductFilterPipe } from './products/product-filter.pipe';
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductDetailGuard } from './products/product-detail.guard';
import { OperatorListComponent } from './operators/operator-list.component';
import { OperatorFilterPipe } from './operators/operator-filter.pipe';
import { OperatorDetailComponent } from './operators/operator-detail.component';
import { OperatorDetailGuard } from './operators/operator-detail.guard';
import { TelecomServiceListComponent } from './telecomservices/telecomservice-list.component';
import { TelecomServiceDetailComponent } from './telecomservices/telecomservice-detail.component';
import { TelecomServiceFilterPipe } from './telecomservices/telecomservice-filter.pipe';
import { TelecomServiceDetailGuard } from './telecomservices/telecomservice-detail.guard';
import { StarComponent } from './shared/star.component';
import { WelcomeComponent } from './home/welcome.component';

@NgModule({
  declarations: [
    AppComponent, ProductListComponent, OperatorListComponent, TelecomServiceListComponent, OperatorFilterPipe,
    TelecomServiceFilterPipe, ProductFilterPipe, StarComponent, WelcomeComponent, ProductDetailComponent,
    OperatorDetailComponent, TelecomServiceDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [{ path: 'products', component: ProductListComponent },
      { path: 'operators', component: OperatorListComponent },
      { path: 'services', component: TelecomServiceListComponent },
      { path: 'products/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent },
      { path: 'operators/:id', canActivate: [OperatorDetailGuard], component: OperatorDetailComponent },
      { path: 'services/:id', canActivate: [TelecomServiceDetailGuard], component: TelecomServiceDetailComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }])
  ],
  providers: [DataService, ProductDetailGuard, OperatorDetailGuard, TelecomServiceDetailGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
