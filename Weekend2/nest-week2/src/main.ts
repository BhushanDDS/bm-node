import { NestFactory, Reflector } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './commons/decorators/timeout.interceptor';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { formatError } from './commons/utils/formaterror';
import { validationExceptionFactory } from './commons/utils/validation-exception.factory';
import { LoggerInterseptor } from './commons/interceptors/Loogr.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new TimeoutInterceptor(new Reflector()));
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     exceptionFactory: (errors) => {
  //       const formattedErrors = errors.flatMap((err) => formatError(err));
  //       return new BadRequestException({ errors: formattedErrors });
  //     },
  //   }),
  // );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.flatMap((err) => formatError(err));
        return new BadRequestException({ errors: formattedErrors });
      },
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();