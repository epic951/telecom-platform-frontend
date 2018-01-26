import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { OperatorModule } from './operators/operator.module';
import { TelecomServiceModule } from './telecomservices/telecomservice.module';

@NgModule({
  declarations: [
    AppComponent, WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule, TelecomServiceModule, OperatorModule,
    RouterModule.forRoot(
      [
        { path: 'welcome', component: WelcomeComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        { path: '**', redirectTo: 'welcome', pathMatch: 'full' }])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
