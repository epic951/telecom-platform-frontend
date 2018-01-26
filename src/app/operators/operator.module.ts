import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OperatorListComponent } from './operator-list.component';
import { OperatorDetailComponent } from './operator-detail.component';
import { OperatorFilterPipe } from './operator-filter.pipe';
import { OperatorDetailGuard } from './operator-detail.guard';
import { OperatorComponent } from './operator.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        OperatorListComponent, OperatorDetailComponent, OperatorFilterPipe, OperatorComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'operators', component: OperatorListComponent },
            { path: 'operators/:id', canActivate: [OperatorDetailGuard], component: OperatorDetailComponent },
            { path: 'add-operator', component: OperatorComponent },
            { path: 'add-operator/:id', component: OperatorComponent }
        ])
    ], providers: [OperatorDetailGuard]
})
export class OperatorModule { }
