import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './app.exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === '1') {
    setupSwagger(app);
  }

  // app.exceptions
  app.useGlobalFilters(new HttpExceptionFilter());
  // validator @Allow()
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
