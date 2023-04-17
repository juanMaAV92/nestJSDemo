import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  
  private readonly logger = new Logger('ProductsService');

  constructor(
    
    @InjectRepository(Product)
    private readonly productoRepository: Repository<Product>,

  ){}
  
  async create(createProductDto: CreateProductDto) {
    try {  
      const product = this.productoRepository.create( createProductDto );
      await this.productoRepository.save( product );
      return product;

    } catch (error) {
      this.handleDBExceptions( error );
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 5, offset = 0 } = paginationDto;  
    const products = await this.productoRepository.find({
      skip: offset,
      take: limit
    });
    return products
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private handleDBExceptions( error: any ){
    if( error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error( error );
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
