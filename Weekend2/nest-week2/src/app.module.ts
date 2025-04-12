import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RateLimitMiddleware } from './commons/middleware/CountRequests.middleware';

@Module({
  imports: [UserModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes({path:'/user/limit', method:RequestMethod.GET})
  }
  
}
