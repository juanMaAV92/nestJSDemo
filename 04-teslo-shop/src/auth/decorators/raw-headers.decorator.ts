
import { ExecutionContext, InternalServerErrorException, createParamDecorator, Header } from '@nestjs/common';


export const RawHeaders = createParamDecorator(
    ( data: string, ctx: ExecutionContext ) => {
        const req = ctx.switchToHttp().getRequest();
        const header = req.headers;
       
        return header
    }
);