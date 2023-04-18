import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto{

    @IsOptional()
    @IsPositive()
    @IsInt()
    @Type( () => Number )   // enableImplicitConversion:true
    limit?: number;
    
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type( () => Number )   // enableImplicitConversion:true
    offset: number;
}