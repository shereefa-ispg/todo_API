import { IsEmail, IsNotEmpty,IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { Role } from "src/roles/schema/schema.roles";

export class createUserDto {

    @IsNotEmpty()
    @IsString()
    firstName : string;

    @IsNotEmpty()
    @IsString()
    lastName : string;

    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    @IsString()
    userName : string;

    @IsNotEmpty()
    @IsString()
    password : string;

    @IsNotEmpty()
    
    role:string;

    
    
    
}

export class userAuthDto extends PartialType(createUserDto) {};