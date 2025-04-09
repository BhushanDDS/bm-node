import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[UserModule,AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService]

})
export class ProfileModule {}

