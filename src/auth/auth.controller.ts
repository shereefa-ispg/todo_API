import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
//import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles/schema/schema.roles';
import { UserGuard } from 'src/guards/user.guard';
import { RolePermissions, UserRole } from 'src/enum/role.enum';
import { UsersService } from 'src/users/users.service';
import {ApiTags,ApiBody,ApiOperation} from '@nestjs/swagger'
import { CreateAuthDto } from 'src/dto/create-dto.auth';



@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService,
    private userservice: UsersService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({summary:'login with credentials'})
  @ApiBody({type:CreateAuthDto})

  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
