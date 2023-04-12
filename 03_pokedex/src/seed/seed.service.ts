import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {
  
  
    private readonly httpService: AxiosInstance = axios;

  async populateDB() {
    const{ data } = await this.httpService.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no:number = +segments[ segments.length - 1];

    })
    return data.results;
  }

}
