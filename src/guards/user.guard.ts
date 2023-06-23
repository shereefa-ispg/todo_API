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
    console.log(context);
    const request = context.switchToHttp().getRequest();
    const userId = String(request.user.userId);
    console.log(userId)
    const roleId = request.user.role;
    const paramUserId = request.params.userId;
    console.log(paramUserId);

    const role = await this.roleService.findRoleById(roleId)
    if (!role) {
      return false;
    }
    const userRole = role.role;
    console.log(userRole);
    if (userRole === UserRole.ADMIN) {
      return true;
    }console.log(userId!==paramUserId)
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













