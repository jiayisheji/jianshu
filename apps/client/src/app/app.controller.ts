import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('validation service')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  public getData() {
    return this.appService.getData();
  }
}
