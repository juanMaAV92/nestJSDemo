import { createReadStream } from 'fs';
import { ApiTags } from '@nestjs/swagger';

import { BadRequestException, Controller, Get, Header, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { diskStorage } from 'multer';

import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';

@ApiTags('Files - get and upload')
@Controller('files')
export class FilesController {
  
  constructor(
    private readonly filesService: FilesService,
    private readonly configServicer: ConfigService  
  ) {}


  @Post('product')
  @UseInterceptors( FileInterceptor('file',{
    fileFilter: fileFilter,
    // limits: { fileSize: 1000 },
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }) )
  uploadProductImage( 
    @UploadedFile() file: Express.Multer.File,
    ){

    if( !file ) throw new BadRequestException('Make sure that the file is an image');

    const secureUrl = `${ this.configServicer.get('HOST_API') }/files/product/${ file.filename }`

    return {secureUrl};
  }

  @Get('product/:imageName')
  @Header('Content-Type', 'image/jpeg')
  findProductImage(@Param('imageName') imgName: string) {
    const stream = createReadStream(this.filesService.getStaticProductImage(imgName));    
    return new StreamableFile(stream);
  }
}
