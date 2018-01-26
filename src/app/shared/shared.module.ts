import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StarComponent } from './star.component';

@NgModule({
    declarations: [StarComponent],
    imports: [CommonModule],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, StarComponent]
})
export class SharedModule { }
