import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Model,ObjectId,Types, model } from 'mongoose';

import { Role, RoleSchema } from '../../roles/schema/schema.roles';
import { Mongoose } from 'mongoose';
import { Todo } from 'src/todo/schema/schema.todo';

// export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
    password: string;

  @Prop({type:Types.ObjectId, ref:'Role'})
  role: Role;

  @Prop({type:Types.ObjectId,ref:'Todo',default:[]})
  todo:Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export interface UserModel extends User,Document{};
export const UserModel:Model<User>=model<UserModel>('User',UserSchema);
