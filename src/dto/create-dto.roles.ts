import { IsNotEmpty,IsObject,IsString } from "class-validator";

export class createRoleDto {
    @IsNotEmpty()
    role:string;
    @IsNotEmpty()
    @IsObject()
    permissions:Record<string,string>
}