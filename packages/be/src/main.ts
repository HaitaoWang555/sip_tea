import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === '1') {
    setupSwagger(app);
  }

  // validator @Allow()
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
