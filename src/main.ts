import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Bangsoal API')
    .setDescription('The Bangsoal API description')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  console.log('Swagger setup complete. Listening on port 5500');
  app.enableCors();
  await app.listen(process.env.PORT || 5500, "0.0.0.0");
}
bootstrap();
