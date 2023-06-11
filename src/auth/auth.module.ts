import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { UserGuard } from 'src/guards/user.guard';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Role,RoleSchema } from 'src/roles/schema/schema.roles';



@Module({
  imports:[RolesModule,MongooseModule.forFeature([{name:Role.name,schema:RoleSchema}]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn:'60s'},
    })
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy,UserGuard,RolesService,RolesModule],
  exports:[AuthService],
  controllers: [AuthController]
  
})
export class AuthModule {}
