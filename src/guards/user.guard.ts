import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/roles/schema/schema.roles';
import { ROLES_KEY, Roles } from 'src/decorators/roles.decorator';
import { RolePermissions, UserRole } from 'src/enum/role.enum';
import { RolesService } from 'src/roles/roles.service';
import { error } from 'console';
import { PERMISSIONS_KEY } from 'src/decorators/permissions.decorator';


@Injectable()
export class UserGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private roleService: RolesService) { }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler()
    ]);

    if (!requiredRoles && !requiredPermissions) {
      return true;
    }
    return this.validateRoles(context, requiredRoles, requiredPermissions)

  }
  async validateRoles(context: ExecutionContext, requiredRoles: UserRole[], requiredPermissions: string[]): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const roleId = request.user.role;
    const paramUserId = request.params.userId;

    const role = await this.roleService.findRoleById(roleId)
    if (!role) {
      return false;
    }
    const userRole = role.role;
    if (userRole === UserRole.ADMIN) {
      return true;
    }
    if (userId !== paramUserId) {
      return false;
    }
    if (requiredRoles) {
      const hasRequiredUserRole = requiredRoles.some(role => role === userRole);
      if (!hasRequiredUserRole) {
        return false;
      }
    }
    if (requiredPermissions) {
      const userPermissions = role.permissions;
      const hasRequiredPermissions = requiredPermissions.every(permission => Object.keys(userPermissions).includes(permission))
      if (!hasRequiredPermissions) {
        return false;
      }
    }
    return true;

  }
  
}













