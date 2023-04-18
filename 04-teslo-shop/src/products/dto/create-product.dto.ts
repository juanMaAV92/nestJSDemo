import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
        IsPositive, IsString, MinLength } from "class-validator";


export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsString()
    @IsOptional()
    slug?: string;
    
    @IsInt()
    @IsOptional()
    @IsPositive()
    stock?: number;
    
    @IsString({ each: true })
    @IsArray()
    size: string[];

    @IsIn([ 'men', 'women', 'kid', 'unisex' ])
    gender: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

}
