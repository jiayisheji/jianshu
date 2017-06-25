import { Injectable } from '@angular/core';





@Injectable()
export class UtilsService {
    constructor() { }
}
export const UTILS_STORAGE_PROVIDERS: Array<any> = [
    {
        provide: UtilsService,
        useClass: UtilsService
    },
];