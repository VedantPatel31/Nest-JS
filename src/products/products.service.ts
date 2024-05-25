import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {Model, ObjectId} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class ProductsService {
  
  constructor(@InjectModel(Product.name) private productModel:Model<Product>){}
  
  async create(createProductDto: CreateProductDto):Promise<Product>{
    // return 'This action adds a new product';
    // console.log("okkk",createProductDto);
    const createdProduct =await this.productModel.create(createProductDto)
    // console.log("c : ",createdProduct);
    
    return createdProduct;
  }

  async findAll():Promise<any> {
    // return `This action returns all products`;
    return await this.productModel.find().populate('category');
  }

  async findOne(id: ObjectId):Promise<any> {
    // return `This action returns a #${id} product`;
    return await this.productModel.findById(id);
  }

  async update(id: ObjectId, updateProductDto: UpdateProductDto) {
    // return `This action updates a #${id} product`;
    return await this.productModel.findByIdAndUpdate(id,updateProductDto)
  }

  remove(id: ObjectId) {
    // return `This action removes a #${id} product`;
    return this.productModel.findByIdAndDelete(id);
  }
}
