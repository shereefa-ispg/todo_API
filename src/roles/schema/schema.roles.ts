import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

@Schema()
export class Role extends Document {
    @Prop({required:true})
    role:string;
    @Prop({type:Object,required:true})
    permissions:Record<string,string>
}
export const RoleSchema=SchemaFactory.createForClass(Role)