import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/schema.users';
import { createUserDto } from 'src/dto/create-dto.users';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<string> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async createUser(body: createUserDto): Promise<User> {
    if (await this.findOneUser(body.userName)) {
      throw new InternalServerErrorException('user already exists');
    }
    const password = body.password;
    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.UserModel({ ...body, password: hashedPassword });
    return newUser.save();
  }

  async findOneUser(username: string): Promise<User> {
    return this.UserModel.findOne({ userName: username }).exec();
  }
}
