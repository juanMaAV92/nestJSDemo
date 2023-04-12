import { Module } from '@nestjs/common';

import { AxiosAdapter } from './adapters/axios.adapter';
import { FetchAdapter } from './adapters/fetch.adapter';
import { HttpAdapter } from './adapters/http.adapter';

@Module({
    providers:[ 
        AxiosAdapter,
        FetchAdapter,
        { provide: HttpAdapter, useExisting: AxiosAdapter}
        ],
    exports: [ HttpAdapter ],
})
export class CommonModule {}
