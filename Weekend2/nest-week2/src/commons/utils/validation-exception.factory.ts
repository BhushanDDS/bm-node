import { BadRequestException, ValidationError } from '@nestjs/common';

export function validationExceptionFactory(errors: ValidationError[]) {
  const formatted = {};

  for (const err of errors) {
    const path =
      err.property + (err.children?.[0] ? `.${err.children[0].property}` : '');

    try {
      const json = JSON.parse(
        err.constraints?.[Object.keys(err.constraints)[0]],
      );
      formatted[path] = json;
    } catch {
      formatted[path] = {
        message: Object.values(err.constraints || {})[0],
      };
    }
  }

  return new BadRequestException({ errors: formatted });
}
