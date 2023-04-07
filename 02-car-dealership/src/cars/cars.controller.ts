import { Controller, Get } from '@nestjs/common';

@Controller('cars')
export class CarsController {

    private cars = ['toyota','Mazda', 'Jeep']
    
    @Get()
    getAllCar(){
        return 
    }

}
