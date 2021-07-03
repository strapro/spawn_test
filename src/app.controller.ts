import { Controller, Get } from '@nestjs/common';
import { performance } from 'perf_hooks';
import * as Queue from 'better-queue'

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

    
    let q = new Queue(function (input, cb) {
      
      let start2 = performance.now();

      let meaningless = input;

      for(let i = 0; i < 10000; i++){
        for(let j = 0; j < 1000; j++){
          for(let k = 0; k < 1000; k++){
            meaningless++;
          }
        } 
      }
    

      let end2 = performance.now();

      console.log(`done in ${end2 - start2} milliseconds`);

      cb(null, meaningless);
    })
 
    q.push(0)
    
    let end = performance.now();

    return `done in ${end - start} milliseconds`;
  }
}
