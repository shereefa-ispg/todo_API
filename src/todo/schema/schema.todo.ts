import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Types } from 'mongoose';
import { User } from 'src/users/schema/schema.users';

export type todoDocument = HydratedDocument<Todo>;

@Schema({ timestamps : true})
export class Todo {
    @Prop({type:Types.ObjectId, ref:'User'})
    userId:string;

    @Prop({ required : true})
    title : string;

    @Prop({ required : true})
    description : string;

    @Prop({ required : true})
    priority : String;

    @Prop({ required : true})
    dueDate : Date;

    @Prop({required : true})
    isCompleted : boolean;
    
   
}

export const TodoSchema =SchemaFactory.createForClass(Todo);