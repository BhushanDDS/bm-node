import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/dto/CreateProductDto';

@Controller('product')
export class ProductController {

    constructor(private productServices: ProductService) {}


    @Post()
    createProduct(@Body()CreateProductDto:CreateProductDto){
        return this.productServices.createProduct(CreateProductDto.name,CreateProductDto.price,CreateProductDto.tags)
    }

    
}
