import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_STORAGE_PROVIDERS } from './storage.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  providers: [
    APP_STORAGE_PROVIDERS
  ],
  entryComponents: [
  ]
})
export class StorageModule {

}
