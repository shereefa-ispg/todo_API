import { Controller, UseFilters,Post,Get ,Body, BadRequestException, Param, NotFoundException} from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/exceptionfilter/http-exception.filter';
import { createUserDto } from 'src/dto/create-dto.users';
import { User } from './schema/schema.users';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
    constructor(private usersService:UsersService){}

    @Post()
    async postUser(@Body() body:createUserDto) : Promise<User> { 
        const user = await this.usersService.createUser(body)
        if (!user) throw new BadRequestException()
        return user;

    }

    @Get(':userName')
    async getOneUser(@Param('userName') userName:string): Promise<User> {
        const user = await this.usersService.findOneUser(userName);
        if(!user) throw new NotFoundException();
        return user;
    }


    
}
