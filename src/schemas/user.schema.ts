import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{
    @Prop()
    name : string;
    @Prop({unique:[true,'email already exists']})
    email : string;

    @Prop()
    passport : string;
}
export const UserSchema = SchemaFactory.createForClass(User);