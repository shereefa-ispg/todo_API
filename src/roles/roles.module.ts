import { Module } from '@nestjs/common';
import { Role } from './schema/schema.roles';
import { RoleSchema } from './schema/schema.roles';
import { MongooseModule } from '@nestjs/mongoose';  
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserGuard } from 'src/guards/user.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
    imports:[MongooseModule.forFeature([{name:Role.name,schema:RoleSchema}]),JwtModule.register({
        secret:jwtConstants.secret,
        signOptions:{expiresIn:'1h'},
    })],
    controllers:[RolesController],
    providers:[RolesService,JwtAuthGuard,UserGuard],
    exports:[RolesService,RolesModule]
})
export class RolesModule {}
