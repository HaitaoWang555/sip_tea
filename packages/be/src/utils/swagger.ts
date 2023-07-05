import { applyDecorators, INestApplication, Type, Logger } from '@nestjs/common';
import { ApiOkResponse, DocumentBuilder, getSchemaPath, SwaggerModule } from '@nestjs/swagger';
import { PageInfo } from '@/common/api/common-page';
import { CommonResult } from '@/common/api/common-result';
import { AUTHORIZATION_PREFIX } from './consts';

export async function setupSwagger(app: INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('nest example')
    .setDescription('The nest API description')
    .setVersion('1.0')
    .addSecurity(AUTHORIZATION_PREFIX, {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .addSecurityRequirements(AUTHORIZATION_PREFIX)
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [CommonResult, PageInfo],
  });
  SwaggerModule.setup('api', app, document);
  new Logger().log(`Swagger Doc: http://localhost:${process.env.PORT}/api`);
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageInfo) },
          {
            properties: {
              list: { type: 'array', items: { $ref: getSchemaPath(model) } },
            },
          },
        ],
      },
    }),
  );
};
