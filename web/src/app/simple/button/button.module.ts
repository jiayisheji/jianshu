import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ButtonBlockDirective, ButtonPillDirective } from './button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ButtonComponent, ButtonBlockDirective, ButtonPillDirective],
  exports: [ButtonComponent, ButtonBlockDirective, ButtonPillDirective]
})
export class ButtonModule { }
