// is-metadata-valid.ts
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsMetadataValid', async: false })
export class IsMetadataValid implements ValidatorConstraintInterface {
  validate(metadata: Record<string, string>) {
    const keyRegex = /^[a-z0-9_]+$/;
    return Object.entries(metadata).every(
      ([key, value]) => keyRegex.test(key) && value.length <= 255
    );
  }

  defaultMessage() {
    return 'Metadata keys/values are invalid';
  }
}
