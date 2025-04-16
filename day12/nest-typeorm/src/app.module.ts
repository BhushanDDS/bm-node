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
    logging: ['query', 'error'], // enables all logs (query + error + schema + warn)
    logger: 'advanced-console', // shows formatted logs
  }),UserModule]
})
export class AppModule {}
