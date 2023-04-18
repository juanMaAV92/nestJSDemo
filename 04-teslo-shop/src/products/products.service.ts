import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  
  private readonly logger = new Logger('ProductsService');

  constructor(
    
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ){}
  
  async create(createProductDto: CreateProductDto) {
    try {  
      const product = this.productRepository.create( createProductDto );
      await this.productRepository.save( product );
      return product;

    } catch (error) {
      this.handleDBExceptions( error );
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;  
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones
    });
    return products
  }

  async findOne( term: string ) {
    let product: Product;    
    if( isUUID( term ) ){
      product = await this.productRepository.findOneBy({ id: term });
    } else{
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
                        .where('title =:title or slug =:slug',{
                          title: term,
                          slug: term,
                        }).getOne(); 
    }     
    if( !product ) throw new NotFoundException(`Product with term '${term}' not found`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    await this.findOne( id );
    await this.productRepository.delete({ id: id });
  }

  private handleDBExceptions( error: any ){
    if( error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error( error );
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
