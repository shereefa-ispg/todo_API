import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo , TodoSchema } from './schema/schema.todo';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/schema/schema.users';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from 'src/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { UserGuard } from 'src/guards/user.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesService } from 'src/roles/roles.service';
import { Role,RoleSchema } from 'src/roles/schema/schema.roles';


@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema},{name:Role.name,schema:RoleSchema},
    {name:User.name,schema:UserSchema}]),UsersModule,PassportModule,RolesModule,JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'1h'},
      
})],
  controllers: [TodoController],
  providers: [TodoService,UsersService,UserGuard,JwtAuthGuard,RolesService]
})
export class TodoModule {}
