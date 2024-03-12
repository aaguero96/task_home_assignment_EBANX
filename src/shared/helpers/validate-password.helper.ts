import * as bcrypt from 'bcrypt';

export const validatePassword = (password: string, hashPassword: string) => {
  return bcrypt.compareSync(password, hashPassword);
};
