import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {


    private products=[];



    createProduct(name:string, price:number,tags:String[]){

        const newProduct={
            name:name,
            price:price,
            tags:tags
        }

        const res=this.products.push(newProduct);
        if(res){
            return {"message":"productCreated",newProduct}
        }

    }
}
