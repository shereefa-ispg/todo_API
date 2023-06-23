import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Todo App')
  .setDescription('The todo API description')
  .setVersion('1.0')
  .addBearerAuth({
    type:"http",
    scheme:"bearer",
    bearerFormat:'JWT',
    name:'JWT',
    description:"Enter Jwt Token",
    in:'header',
  },'access-token')
  .addTag('todos')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('http://localhost:3000')
}
bootstrap();
