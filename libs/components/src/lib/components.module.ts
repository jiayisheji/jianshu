import { NgModule } from '@angular/core';
import { ButtonModule } from './button';

@NgModule({
  imports: [ButtonModule],
  exports: [ButtonModule]
})
export class ComponentsModule { }
