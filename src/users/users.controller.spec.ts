import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserGuard } from 'src/guards/user.guard';
import { UserRole,RolePermissions } from 'src/enum/role.enum';

describe('UsersController', () => {
  let controller: UsersController;
  let userService:UsersService;
  let jwtAuthGuard:JwtAuthGuard;
  let userGuard:UserGuard;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[UsersService,JwtAuthGuard,UserGuard]
    }).compile();

    controller = await module.get<UsersController>(UsersController);
    userService = await module.get<UsersService>(UsersService);
    jwtAuthGuard= await module.get<JwtAuthGuard>(JwtAuthGuard);
    userGuard = await module.get<UserGuard>(UserGuard);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
