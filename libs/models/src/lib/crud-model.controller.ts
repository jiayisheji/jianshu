import { ApiOperation, ApiResponse, ApiOkResponse, ApiForbiddenResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { CrudModel } from './crud-model.interface';
import { HttpStatus, Get, Param, HttpCode, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { CrudModelService, Paginator, PaginationParams } from './crud-model.service';
import { FindAndModifyWriteOpResultObject } from 'mongodb';

@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden.' })
export abstract class CrudModelController<T extends CrudModel>  {

  constructor(private readonly crudService: CrudModelService<T>) { }

  @ApiOperation({ title: 'find all' })
  @ApiOkResponse({ description: 'Found records' })
  @Get()
  async findAll(@Query() filter: PaginationParams<T>): Promise<Paginator<T>> {
    return this.crudService.paginator(filter);
  }

  @ApiOperation({ title: 'Find by id' })
  @ApiOkResponse({ description: 'Found one record' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<T> {
    return this.crudService.findOne(id);
  }

  @ApiOperation({ title: 'Create new record' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid input, The response body may contain clues as to what went wrong' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() entity: Partial<T>, ...options: any[]): Promise<T> {
    return this.crudService.create(entity);
  }

  @ApiOperation({ title: 'Update an existing record' })
  @ApiCreatedResponse({ description: 'The record has been successfully edited.' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @ApiBadRequestResponse({ description: 'Invalid input, The response body may contain clues as to what went wrong' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Put(':id')
  async update(@Param('id') id: string, @Body() entity: Partial<T>, ...options: any[]): Promise<any> {
    return this.crudService.update(id, entity);
  }

  @ApiOperation({ title: 'Delete record' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The record has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string, ...options: any[]): Promise<FindAndModifyWriteOpResultObject<T>> {
    return this.crudService.delete(id);
  }
}
