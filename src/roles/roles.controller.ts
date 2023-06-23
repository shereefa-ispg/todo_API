import { Controller, Post, Get, Body, Param, NotFoundException, InternalServerErrorException, Patch, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { createRoleDto } from 'src/dto/create-dto.roles';
import { Role } from './schema/schema.roles';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserGuard } from 'src/guards/user.guard';
import { UserRole } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import {ApiSecurity} from '@nestjs/swagger';
@ApiSecurity('access-token')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) { }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    async create(@Body() body: createRoleDto): Promise<Role> {
        const role = this.roleService.createRole(body);
        if (!role) {
            throw new InternalServerErrorException();
        }
        return role;
    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Roles(UserRole.ADMIN)
    @Get()
    async findAll(): Promise<Role[]> {
        return await this.roleService.findAll();
    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Roles(UserRole.ADMIN)
    @Get('/:id')
    async findOne(@Param('id') id: string): Promise<Role> {
        const role = this.roleService.findRoleById(id);
        if (!role) {
            throw new NotFoundException()
        }
        return role;
    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Roles(UserRole.ADMIN)
    @Patch('/:id')
    async updateRole(@Param('id') id: string, @Body() updatedRole: Partial<createRoleDto>): Promise<Role> {
        const role = this.roleService.updateRoleById(id, updatedRole);
        if (!role) {
            throw new NotFoundException();
        }
        return role;
    }

    @UseGuards(JwtAuthGuard, UserGuard)
    @Roles(UserRole.ADMIN)
    @Delete('/:id')
    async deleteRole(@Param('id') id: string): Promise<any> {
        const role = this.roleService.deleteRoleById(id);
        if (!role) {
            throw new NotFoundException();
        }
        return "deleted successfully"
    }

}
