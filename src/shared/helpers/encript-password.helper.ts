import * as bcrypt from 'bcrypt';

export const encriptPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};
