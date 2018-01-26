import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductFilterPipe } from './product-filter.pipe';
import { ProductDetailGuard } from './product-detail.guard';
import { ProductComponent } from './product.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ProductListComponent, ProductDetailComponent, ProductFilterPipe, ProductComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'products', component: ProductListComponent },
            { path: 'products/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent },
            { path: 'add-product', component: ProductComponent },
            { path: 'add-product/:id', component: ProductComponent }
        ])
    ], providers: [ProductDetailGuard]
})
export class ProductModule { }
