import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type todoDocument = HydratedDocument<Todo>;

@Schema({ timestamps : true})
export class Todo {

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