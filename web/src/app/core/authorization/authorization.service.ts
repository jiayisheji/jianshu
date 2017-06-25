import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageType, StorageService } from  '../storage';

const isBlank = (obj) => {
    return obj === null || obj === undefined;
};

@Injectable()
export class AuthorizationService {
    private static STORAGE_POOL_KEY = "jianshu-authorization";
    private static STORAGE_KEY = "current-user";
    private storageType: StorageType;
    private currentUser: any;

    constructor(private storageService: StorageService) {
        this.storageType = StorageType.localStorage;
    }

    setStorageType(storageType: StorageType) {
        this.storageType = storageType;
    }

    setCurrentUser(currentUser: any): void {
        this.storageService.put({
            pool: AuthorizationService.STORAGE_POOL_KEY,
            key: AuthorizationService.STORAGE_KEY,
            storageType: this.storageType
        }, currentUser);

        this.currentUser = currentUser;
    }

    getCurrentUser(): any {
        if (this.currentUser) {
            return this.currentUser;
        }

        return this.currentUser = this.storageService.get({
            pool: AuthorizationService.STORAGE_POOL_KEY,
            key: AuthorizationService.STORAGE_KEY,
            storageType: this.storageType
        });
    }

    logout() {
        this.currentUser = null;
        return this.storageService.remove({
            pool: AuthorizationService.STORAGE_POOL_KEY,
            key: AuthorizationService.STORAGE_KEY,
            storageType: this.storageType
        });
    }

    isLogin() {
        return !!this.getCurrentUser();
    }

    hasRight(roles: any | any[]): Observable<boolean>| boolean {
        if (!this.getCurrentUser()) {
            return false;
        }

        if (!Array.isArray(roles)) {
            roles = [roles];
        }

        return this.currentUser.roles && roles.some(role => this.currentUser.roles.indexOf(role) !== -1);
    }
}
