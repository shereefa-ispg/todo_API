import { IsEmail, IsNotEmpty,IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { Role } from "src/enum/role.enum";

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

    role:Role;
}

export class userAuthDto extends PartialType(createUserDto) {};