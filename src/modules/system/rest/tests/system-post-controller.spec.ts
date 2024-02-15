import { mock, mockClear } from 'jest-mock-extended';
import { mockRes } from '../../../../shared/helpers/mock-res.helper';
import { SystemPostController } from '../posts/system-post.controller';
import { ISystemService } from '../../services/system-service.interface';

describe('test SystemPostController class', () => {
  const systemServiceMock = mock<ISystemService>();

  const systemController = new SystemPostController(systemServiceMock);

  beforeEach(() => {
    mockClear(systemServiceMock);
    jest.clearAllMocks();
  });

  describe('test reset method', () => {
    it('call reset by SystemService once with correct args', async () => {
      // MOCKS
      const res = mockRes();
      const fnReset = systemServiceMock.reset.mockResolvedValue();

      // ACTUAL
      await systemController.reset(res);

      // EXPECT
      expect(fnReset).toHaveBeenCalledTimes(1);
      expect(fnReset).toHaveBeenCalledWith();
    });

    it('response OK as send and status 200', async () => {
      // MOCKS
      const res = mockRes();
      systemServiceMock.reset.mockResolvedValue();

      // ACTUAL
      await systemController.reset(res);

      // EXPECT
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('OK');
    });
  });
});
