import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Category } from "./category.schema";

@Schema()
export class Product{
    @Prop()
    name:string;

    @Prop()
    price:number;
   
    @Prop()
    qty:number;
   
    @Prop()
    description:string;
    @Prop({
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    })
    category:Category;
}
export const productSchema = SchemaFactory.createForClass(Product);