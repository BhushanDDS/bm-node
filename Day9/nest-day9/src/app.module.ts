import {  Get, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './common/middlerwares/logger';
import { AdminModule } from './admin/admin.module';
import { AuthMiddleware } from './common/middlerwares/auth';
import { ConfigModule } from '@nestjs/config';
import { VerifyApiKeyMiddleware } from './common/middlerwares/verifyApikey';

@Module({
  imports: [ProductModule, UserModule, AdminModule,ConfigModule.forRoot({isGlobal: true,})]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'admin/*wildcard', method:  RequestMethod.ALL }); 


    consumer
      .apply(AuthMiddleware)
      .forRoutes({path:'admin/post-admin',method:RequestMethod.POST})

      consumer
        .apply(VerifyApiKeyMiddleware)  
        .forRoutes({path:'admin/reports', method:RequestMethod.GET})

  }
}
