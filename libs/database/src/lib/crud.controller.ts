import { ApiOperation, ApiResponse, ApiOkResponse, ApiForbiddenResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { HttpStatus, Get, Param, HttpCode, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { CrudRepositoryService, Paginator, PaginationParams } from './crud-repository.service';
import { FindAndModifyWriteOpResultObject } from 'mongodb';
import { Typegoose, InstanceType } from 'typegoose';

@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden.' })
export abstract class CrudController<T extends Typegoose>  {

  constructor(private readonly crudService: CrudRepositoryService<T>) { }

  @ApiOperation({ title: 'find all' })
  @ApiOkResponse({ description: 'Found records' })
  @Get()
  public async findAll(@Query() filter: PaginationParams<InstanceType<T>>): Promise<Paginator<InstanceType<T>>> {
    return this.crudService.paginator(filter);
  }

  @ApiOperation({ title: 'Find by id' })
  @ApiOkResponse({ description: 'Found one record' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Get(':id')
  public async findById(@Param('id') id: string): Promise<InstanceType<T>> {
    return this.crudService.findOne(id);
  }

  @ApiOperation({ title: 'Create new record' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid input, The response body may contain clues as to what went wrong' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() entity: Partial<T>): Promise<InstanceType<T>> {
    return this.crudService.create(entity);
  }

  @ApiOperation({ title: 'Update an existing record' })
  @ApiCreatedResponse({ description: 'The record has been successfully edited.' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @ApiBadRequestResponse({ description: 'Invalid input, The response body may contain clues as to what went wrong' })
  @HttpCode(HttpStatus.CREATED)
  @Put(':id')
  public async update(@Param('id') id: string, @Body() entity: Partial<InstanceType<T>>): Promise<InstanceType<T>> {
    return this.crudService.update(id, entity);
  }

  @ApiOperation({ title: 'Delete record' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The record has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<FindAndModifyWriteOpResultObject<InstanceType<T>>> {
    return this.crudService.delete(id);
  }
}
