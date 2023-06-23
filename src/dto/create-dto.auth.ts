import { IsNotEmpty, IsString } from "class-validator";
import {ApiProperty} from '@nestjs/swagger'

export class CreateAuthDto {
@ApiProperty()
@IsNotEmpty()
@IsString()

userName: string;
@ApiProperty()
@IsNotEmpty()
@IsString()

password:string;
}
