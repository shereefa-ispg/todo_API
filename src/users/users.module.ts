import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/schema.users';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';



@Module({
  imports: [MongooseModule.forFeature([{name:User.name, schema: UserSchema}]),PassportModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports :[UsersService]
})
export class UsersModule {}
