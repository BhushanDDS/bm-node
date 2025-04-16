import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'NewPassword',
    database: 'nestapi',
    entities: [User], 
    synchronize: true, 
    logging: ['query', 'error'], 
    logger: 'advanced-console', 
  }),UserModule]
})
export class AppModule {}
