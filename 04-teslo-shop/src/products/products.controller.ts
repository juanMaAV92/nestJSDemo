import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';


@ApiTags( 'Products' )
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'Product was created', type: Product })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User
    ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll( paginationDto );
  }

  @Get(':term')
  findOne( @Param('term') term: string ) {
    return this.productsService.findOnePlain( term );
  }

  @Patch(':id')
  update( @Param('id', ParseUUIDPipe) id: string, 
          @Body() updateProductDto: UpdateProductDto,
          @GetUser() user: User,
          ) {
    return this.productsService.update(id, updateProductDto, user );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.productsService.remove(id);
  }
}
