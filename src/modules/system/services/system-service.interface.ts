export const SYSTEM_SERVICE = Symbol('SYSTEM_SERVICE');

export interface ISystemService {
  reset: () => Promise<void>;
}
