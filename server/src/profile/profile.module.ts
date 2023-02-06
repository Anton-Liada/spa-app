import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [UsersModule, AuthModule],
})
export class ProfileModule {}
