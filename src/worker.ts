import settings from './settings';

process.on('message', (input: number) => {
  let meaningless = input;

  for(let i = 0; i < settings.I; i++){
    for(let j = 0; j < settings.J; j++){
      for(let k = 0; k < settings.K; k++){
          meaningless++;
      }
    } 
  }
  
  process.send(meaningless);
  
  process.exit(0)
});      

