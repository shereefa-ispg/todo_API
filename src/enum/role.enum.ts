export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export const RolePermissions = {
  [UserRole.USER]: {
    read: 'read',
    write: 'write',
    update: 'update',
    delete: 'delete'
  },
  [UserRole.ADMIN]: {

    read: 'read',
    write: 'write',
    update: 'update',
    delete: 'delete'

  }
}