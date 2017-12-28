import { Controller, Post, Body, Res, HttpStatus, Get, Delete, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('用户模块 user')
@Controller('api/v1')
export class UserController {
    constructor(private readonly _user: UserService) { }
    @Post('user/create')
    @ApiResponse({ status: 200, description: '创建成功' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    create(
        @Res() res,
    ) {
        res.status(HttpStatus.CREATED).json();
    }

    @Get('user/findOne')
    @ApiResponse({ status: 200, description: '查询成功' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    findOne(
        @Res() res,
    ) {
        res.status(HttpStatus.OK).json();
    }

    @Get('user/findAll')
    @ApiResponse({ status: 200, description: '查询成功' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    findAll(
        @Res() res,
    ) {
        res.status(HttpStatus.OK).json();
    }

    @Delete('user/delete')
    @ApiResponse({ status: 200, description: '删除成功' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    delete(
        @Res() res,
        @Param() params,
    ) {
        res.status(HttpStatus.ACCEPTED).json();
    }

    @Put('user/update')
    @ApiResponse({ status: 200, description: '更新成功' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    update(
        @Res() res,
    ) {
        res.status(HttpStatus.OK).json();
    }
}