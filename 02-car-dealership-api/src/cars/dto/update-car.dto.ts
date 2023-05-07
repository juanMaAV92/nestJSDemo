


import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator'

export class UpdateCarDto{

    @IsUUID()
    @IsOptional()
    readonly id?: string;
    
    @IsString()
    @IsOptional()
    readonly brand?: string;
    
    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly model?: string;
}