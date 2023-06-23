import { IsNotEmpty,IsObject,IsString } from "class-validator";
import {ApiProperty} from '@nestjs/swagger';

export class createRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    role:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    permissions:Record<string,string>
}