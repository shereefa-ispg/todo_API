import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configure: ConfigService) => {
        const config = configure.get('database');
        return {
            uri: config.host,
            useNewUrlParser: true,
          }
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule]
})
export class DatabaseModule {}
