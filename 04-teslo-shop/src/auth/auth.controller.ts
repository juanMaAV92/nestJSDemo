import { Controller,  Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }
 
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User,
  ){
    return this.authService.checkAuthStatus( user )
  }


  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: IncomingHttpHeaders,
  ){
    return{
      "message": "hola mundo privado",
      user,
      userEmail,
      rawHeaders
    }
  }


  @Get('private2')
  // @SetMetadata( 'roles', ['admin', 'super-user'])
  @RoleProtected( ValidRoles.superUser, ValidRoles.user )
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(
    @GetUser() user: User
  ){

    return {
      ok: true,
      user
    }
  }

  @Get('private3')
  @Auth(  ValidRoles.superUser, ValidRoles.user  )
  privateRoute3(
    @GetUser() user: User
  ){

    return {
      ok: true,
      user
    }
  }

}
