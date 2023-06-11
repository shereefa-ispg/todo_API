import { Controller, UseFilters,Post,Get ,Param,Body, BadRequestException, NotFoundException, Patch, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/exceptionfilter/http-exception.filter';
import { createUserDto } from 'src/dto/create-dto.users';
import { User } from './schema/schema.users';
import { Roles } from 'src/decorators/roles.decorator';
import { RolePermissions, UserRole } from 'src/enum/role.enum';

import {UseGuards} from '@nestjs/common';
import { UserGuard } from 'src/guards/user.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Permissions } from 'src/decorators/permissions.decorator';
import { Request } from 'express';


@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UsersController {
    constructor(private usersService:UsersService){}

    @Post()
    async postUser(@Body() body:createUserDto) : Promise<User> { 
        const user = await this.usersService.createUser(body)
        if (!user) throw new BadRequestException()
        return user;

    }
    @UseGuards(JwtAuthGuard,UserGuard)
    @Roles(UserRole.ADMIN)
    @Get()
    async GetAllUsers():Promise<User[]>{
        const users=await this.usersService.findAll();
        if(!users){
            throw new NotFoundException("No users")
        }
        return users;
    }

    
    @UseGuards(JwtAuthGuard,UserGuard)
    @Roles(UserRole.USER)
    @Permissions(RolePermissions[UserRole.USER].read)
    @Get('profile/:userId')
    async getOneUser(@Param('userId') userId:string): Promise<User> {
        
        const user = await this.usersService.findUserById(userId);
        if(!user) {throw new NotFoundException();}
        return user;
    }

    
    @UseGuards(JwtAuthGuard,UserGuard)
    @Roles(UserRole.USER)
    @Permissions(RolePermissions[UserRole.USER].update)
    @Patch('edit/:userId')
    async updateUser(@Param('userId') userId:string, @Body() updatedUser:Partial<createUserDto>):Promise<User>{
        const user=await this.usersService.updateUser(userId,updatedUser);
        if(!user){ throw new NotFoundException();}
        return user;

    }
    @UseGuards(JwtAuthGuard,UserGuard)
    @Roles(UserRole.USER)
    @Permissions(RolePermissions[UserRole.USER].delete)
    @Delete('delete/:userId')
    async deleteUser(@Param('userId') userId:string):Promise<void>{
        await this.usersService.deleteUserById(userId);
        

        }
    }



    


    

