import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './app.exceptions';
import * as bodyParser from 'body-parser';
import { OperatelogService } from './monitor/operateLog/operateLog.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === '1') {
    setupSwagger(app);
  }
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
  // app.exceptions
  const httpAdapterHost = app.get(HttpAdapterHost);
  const s = app.get(OperatelogService);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost, s));
  // validator @Allow()
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
