import { validate } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { RequestInvalidException } from 'src/modules/account/exceptions/request-invalid.exception';

export const requestValidator = async (
  validationClass: ClassConstructor<any>,
  objectToValidate: any,
): Promise<void> => {
  const classToValidate = plainToInstance<any, any>(
    validationClass,
    objectToValidate,
  );
  const errors = await validate(classToValidate);
  if (errors.length) {
    throw new RequestInvalidException(errors);
  }
};
