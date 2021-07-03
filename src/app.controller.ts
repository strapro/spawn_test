import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { performance } from 'perf_hooks';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    let start = performance.now();

    let end = performance.now();
    return `hello in ${end - start} milliseconds`;
  }

  @Get('thing')
  getThing(): string {

    let start = performance.now();

    let meaningless = 0;

    for(let i = 0; i < 10000; i++){
      for(let j = 0; j < 1000; j++){
        for(let k = 0; k < 1000; k++){
          meaningless++;
        }
      } 
    }

    let end = performance.now();

    return `done in ${end - start} milliseconds`;
  }
}
