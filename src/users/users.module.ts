import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/schema.users';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from 'src/roles/roles.module';
import { UserGuard } from 'src/guards/user.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesService } from 'src/roles/roles.service';
import { TodoModule } from 'src/todo/todo.module';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { Role,RoleSchema } from 'src/roles/schema/schema.roles';




@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{name:Role.name,schema:RoleSchema}
  ]), PassportModule,RolesModule,JwtModule.register({
    secret: jwtConstants.secret,
      signOptions: { expiresIn:'1h'},
  })],
  providers: [UsersService,UserGuard,JwtAuthGuard,JwtStrategy,RolesService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
