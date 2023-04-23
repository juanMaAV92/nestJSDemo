import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtservice: JwtService,
  ){}


  async create( createUserDto: CreateUserDto ) {

    try {
      const { password, ...userData } = createUserDto;      
      const user = this.userRepository.create( {
        ...userData,
        password: bcrypt.hashSync( password, 10 )
       });
      await this.userRepository.save( user );
      delete user.password;
      
      return {
        ...user,
        token: this.getJWT( { email: user.email } ),
      };

    } catch (error) {
      this.handleDBErrors( error );
    }

  }

  async login( loginUserDto: LoginUserDto ){
      const { password, email } = loginUserDto;
      const user = await this.userRepository.findOne({ 
        where: { email },
        select: { email: true, password: true } 
      });

      if ( !user )
        throw new UnauthorizedException('Credentials are not Valid (email)');
      
      if ( !bcrypt.compareSync( password, user.password ) )
        throw new UnauthorizedException('Credentials are not Valid (password)')
      
      return {
        ...user,
        token: this.getJWT( { email: user.email } ),
      };

    
  }


  private getJWT( payload: JwtPayload ){
    const token = this.jwtservice.sign( payload );
    return token;
  }



  private handleDBErrors( error: any ): never {

    if( error.code === '23505')
      throw new BadRequestException( error.detail );
    
    console.log( error );

    throw new InternalServerErrorException('Please check server logs');
  }

 
}
