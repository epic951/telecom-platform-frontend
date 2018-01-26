import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TelecomServiceListComponent } from './telecomservice-list.component';
import { TelecomServiceDetailComponent } from './telecomservice-detail.component';
import { TelecomServiceFilterPipe } from './telecomservice-filter.pipe';
import { TelecomServiceDetailGuard } from './telecomservice-detail.guard';
import { TelecomServiceComponent } from './telecomservice.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        TelecomServiceListComponent, TelecomServiceDetailComponent, TelecomServiceFilterPipe, TelecomServiceComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'services', component: TelecomServiceListComponent },
            { path: 'services/:id', canActivate: [TelecomServiceDetailGuard], component: TelecomServiceDetailComponent },
            { path: 'add-service', component: TelecomServiceComponent },
            { path: 'add-service/:id', component: TelecomServiceComponent }
        ])
    ], providers: [TelecomServiceDetailGuard]
})
export class TelecomServiceModule { }
