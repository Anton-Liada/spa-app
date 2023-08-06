import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { Company } from './companies/companies.model';
import { ProfileModule } from './profile/profile.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'dpg-cj7p1utjeehc739bfdj0-a.oregon-postgres.render.com',
      port: 5432,
      username: 'jikkentaky',
      password: 'pq7SWe63nVLIoND4RhajJcA1SNN8J2Is',
      database: 'nestjs_cfmg',
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      models: [User, Role, UserRoles, Company],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    CompaniesModule,
    ProfileModule,
  ],
})
export class AppModule {}
