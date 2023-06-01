import { IsNotEmpty, IsString, IsBoolean, MaxLength} from "class-validator";
import { Transform } from "class-transformer";
import { PartialType} from "@nestjs/mapped-types";

export class createTodoDto {

    @IsNotEmpty()
    @IsString()
    title : string;

    @IsNotEmpty()
    @IsString()
    description : string;

    @IsString()
    @MaxLength(10)
    priority : string;

    @Transform(({ value }) => new Date(value))
    dueDate : Date;

    @IsBoolean()
    isCompleted : boolean;
}

export class updateTodoDto extends PartialType(createTodoDto) {}