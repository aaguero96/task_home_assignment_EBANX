import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface CurrentUserData {
  username: string;
  id: string;
  accountId: string;
  iat: string;
  exp: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
