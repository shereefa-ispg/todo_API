import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { url } from 'inspector';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './todo/todo.module';

import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import configuration from './config/configuration';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    DatabaseModule,

    TodoModule,

    UsersModule,

    AuthModule,
    PassportModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
