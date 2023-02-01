import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { User } from '../users/users.model';
import { CompaniesController } from './companies.controller';
import { Company } from './companies.model';
import { CompaniesService } from './companies.service';

@Module({
  providers: [CompaniesService],
  controllers: [CompaniesController],
  imports: [
    SequelizeModule.forFeature([User, Company]),
    UsersModule,
    forwardRef(() => AuthModule),
  ],
})
export class CompaniesModule {}
