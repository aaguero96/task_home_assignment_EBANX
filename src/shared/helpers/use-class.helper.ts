import { ClassProvider, Type } from '@nestjs/common';

export const useClass = (
  provide: symbol,
  useClass: Type<any>,
): ClassProvider => ({
  provide,
  useClass,
});
