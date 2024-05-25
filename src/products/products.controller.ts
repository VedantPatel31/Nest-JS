import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ObjectId } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags("products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto,@Req() req,@Res() res):Promise<any> {
    // return this.productsService.create(createProductDto);
    res.status(HttpStatus.CREATED).json({
      message:"Product created successfully",
      date:await this.productsService.create(createProductDto)
    })
  }

  // @Get()
  // findAll() {
  //   return this.productsService.findAll();
  // }
  @UseGuards(AuthGuard)
  @Get()
  async findAll():Promise<any> {
    return await this.productsService.findAll();
  }

  // @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.productsService.remove(id);
  }
}
