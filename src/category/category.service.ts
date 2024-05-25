import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  // constructor(
  //   @InjectModel(Category.name) private categoryModel:Model<Category>
  // ){}
  // async create(createCategoryDto: CreateCategoryDto):Promise<any> {
  //   const createdcategory = this.categoryModel.create(createCategoryDto);
  //   return createdcategory
  //   // return 'This action adds a new category';

  // }
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<any>{
    const createdcategory = this.categoryModel.create(createCategoryDto);
    return createdcategory;
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
