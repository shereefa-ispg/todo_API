import { IsEmail, IsNotEmpty,IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { Role } from "src/roles/schema/schema.roles";
import {ApiProperty} from '@nestjs/swagger'

export class createUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userName : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password : string;

    @ApiProperty()
    @IsNotEmpty()
    role:string;

    
    
    
}

export class userAuthDto extends PartialType(createUserDto) {};