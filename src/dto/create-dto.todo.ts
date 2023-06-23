import { IsNotEmpty, IsString, IsBoolean, MaxLength} from "class-validator";
import { Transform } from "class-transformer";
import { PartialType} from "@nestjs/mapped-types";
import {ApiProperty} from '@nestjs/swagger';

export class createTodoDto {

   // @IsNotEmpty()
    //userId : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description : string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    priority : string;

    @ApiProperty()
    @Transform(({ value }) => new Date(value))
    dueDate : Date;
    
    @ApiProperty()
    @IsBoolean()
    isCompleted : boolean;
}

export class updateTodoDto extends PartialType(createTodoDto) {}