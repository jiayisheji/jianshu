import { Component } from '@nestjs/common';
import { UserService } from '../user';
@Component()
export class AuthService {
    constructor(private userService: UserService) { }
    login(body) {
        return [];
    }

    register(body) {
        return this.userService.create(body);
    }
}