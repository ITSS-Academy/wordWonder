import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './utils/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './domains/users/users.module';
import { UsersService } from './domains/users/users.service';
import { Role } from './domains/users/entities/user.entity';
import { EbooksModule } from './domains/ebooks/ebooks.module';
import { AuthModule } from './domains/auths/auth.module';
import { CategoriesModule } from './domains/categories/categories.module';
import { SearchModule } from './domains/search/search.module';
import { UserEbooksModule } from './domains/user_ebooks/user_ebooks.module';
import { SectionsModule } from './domains/sections/sections.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.username,
      password: configuration().database.password,
      database: configuration().database.name,
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      ssl: { rejectUnauthorized: false },
    }),
    JwtModule.register({
      global: true,
      secret: configuration().jwt_secret,
      signOptions: { expiresIn: '3600s' },
    }),
    UsersModule,
    EbooksModule,
    AuthModule,
    CategoriesModule,
    SearchModule,
    UserEbooksModule,
    SectionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {
    try {
      //find in the db if there is a user with the admin role
      this.userService.findOneByRole('ADMIN').then(async (user) => {
        if (!user) {
          await this.userService.create({
            id: 'admin',
            nickName: 'admin',
            email: this.configService.get<string>('STATIC_USER_EMAIL'),
            phoneNumber: '30-210-1234567',
            photoURL: '',
            joinedDate: '',
            password: this.configService.get<string>('STATIC_USER_PASSWORD'),
            role: Role.ADMIN,
          });
        } else {
          console.log('static admin user already exists');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
