import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/schema.users';
//import * as bcrypt from 'bcryptjs';
import { HttpExceptionFilter } from 'src/exceptionfilter/http-exception.filter';
import { UseFilters } from '@nestjs/common';

@Injectable()
@UseFilters(HttpExceptionFilter)
export class AuthService {
  constructor(
    private userService: UsersService,
   private jwtService: JwtService,
  ) {}
  
  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.userService.findOneUser(userName);
    if (!user) throw new UnauthorizedException("invalid username");
    const isMatch = await this.userService.comparePassword(
      password,
      user.password,
    );
    if (isMatch) {
      return user;
    }
    throw new UnauthorizedException("invalid password");
  }

  async login(user: User) {
    const payload = { username: user.userName, sub: user._id, role:user.role };
    return { accessToken:this.jwtService.sign(payload)}
  }
  

  
}
