import { Controller, Get } from '@nestjs/common';
import { performance } from 'perf_hooks';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    let start = performance.now();

    let end = performance.now();

    return `hello in ${end - start} milliseconds`;
  }

  @Get('thing')
  getThing(): string {
    let start = performance.now();
    
    this.appService.push(Math.random());

    let end = performance.now();

    return `done in ${end - start} milliseconds`;
  }
}
