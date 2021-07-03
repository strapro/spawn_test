import path = require('path');
import { Injectable } from '@nestjs/common';
import { fork } from 'child_process'
import * as Queue from 'better-queue'
import settings from './settings';
import { string } from 'yargs';

@Injectable()
export class AppService {
  private q:any; 
  private counter: number = 0;

  constructor() {
    console.log('New queue')
    
    this.q = new Queue(
      (task: {id: string, input: number}, cb: Function) => {
        console.log(`Processing task with id: ${task.id} and input: ${task.input}`);

        this.forking(task.input, cb);
        //this.blocking(task.input, cb);
      }, 
      {
        id: 'id',
        concurrent: 2
      }
    )

    this.q.on('task_finish', function (id: string, result: number, stats: { elapsed: number }) {
      console.log(`Task with id: ${id} returned: ${result} in ${stats.elapsed} milliseconds`)
    })

    this.q.on('task_failed', function (id: string, error: string, stats: { elapsed: number }) {
      console.log(`Task with id: ${id} error: ${error} in ${stats.elapsed} milliseconds`)      
    })
  }

  push(input: number): void {
    let task = {
      id: (this.counter++).toString(),
      input: input
    }
    
    console.log(`Pushing task with id: ${task.id} and input: ${task.input}`);

    this.q.push(task);      
  }

  forking(input: number, cb: Function) {
    let child = fork(path.resolve(__dirname, './worker'));

    child.on('message', (result) => {
      cb(null, result)
    });

    child.send(input)
  }

  blocking(input: number, cb: Function) {
    let meaningless = input;

    for(let i = 0; i < settings.I; i++){
      for(let j = 0; j < settings.J; j++){
        for(let k = 0; k < settings.K; k++){
          meaningless++;
        }
      } 
    }

    cb(null, meaningless);
  }
}
