import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SimAnchorComponent, SimButtonComponent } from './button.component';

@NgModule({
  declarations: [SimButtonComponent, SimAnchorComponent],
  imports: [CommonModule],
  exports: [SimButtonComponent, SimAnchorComponent],
  providers: [],
})
export class SimButtonModule {}
