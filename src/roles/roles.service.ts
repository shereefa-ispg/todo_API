import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schema/schema.roles';
import { createRoleDto } from 'src/dto/create-dto.roles';
import { error } from 'console';


@Injectable()
export class RolesService {
    constructor(@InjectModel(Role.name) private RoleModel:Model<Role>){}
    
    async createRole(body:createRoleDto):Promise<Role>{
        const role=await this.RoleModel.create(body);
        return role;
    }

    async findAll():Promise<Role[]>{
        return await this.RoleModel.find().exec();
    }
    async findRoleById(id:string):Promise<Role>{
        const role=await this.RoleModel.findById(id).exec();
        if(!role){ throw new error();}
        return role;
    }

    async updateRoleById(id:string,updatedRole:Partial<createRoleDto>):Promise<Role>{
        const role=await this.RoleModel.findByIdAndUpdate(id,updatedRole,{new:true}).exec();
        return role;


    }

    async deleteRoleById(id:string):Promise<any>{
        await this.RoleModel.findByIdAndDelete(id).exec();
    
    }


    
}
