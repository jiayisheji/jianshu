import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * 自定义UI组件
 */
import { SimpleModule } from '@app/simple';

// imports and exports Module
const sharedModule = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  SimpleModule
];

// declarations and exports Component
const sharedComponent = [
];


@NgModule({
  imports: sharedModule,
  declarations: [
    ...sharedComponent,
  ],
  exports: [
    ...sharedModule,
    ...sharedComponent
  ]
})
export class SharedModule { }
