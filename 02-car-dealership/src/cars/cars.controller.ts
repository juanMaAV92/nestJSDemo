import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
// @UsePipes( ValidationPipe )   //other module maybe need it, better applies en main (globally)
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ){}
  
    @Get()
    getAllCar(){
        return this.carsService.findAll();
    }

    @Get( ':id' )
    getCarById( @Param('id', ParseUUIDPipe ) id: string ){         
        return this.carsService.findById(id)
    }

    @Post()
    // Here it only applies in the Post route, patch need it too, better apply in class
    // @UsePipes( ValidationPipe )
    createCar( @Body() createCarDto: CreateCarDto ){
        return createCarDto
    }

    @Patch(':id')
    updateCar( 
        @Param('id', ParseUUIDPipe ) id: string, 
        @Body() body: any )
    {
        return {body, id}
    }

    @Delete( ':id' )
    deleteCar( @Param('id', ParseUUIDPipe ) id: string ){         
        return id;
    }


}
