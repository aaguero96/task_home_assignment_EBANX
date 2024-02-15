export const createDataSourceMock: any = () => {
  const connectMock = jest.fn();
  const startTransactionMock = jest.fn();
  const commitTransactionMock = jest.fn();
  const rollbackTransactionMock = jest.fn();
  const releaseMock = jest.fn();
  const managerMock = {};
  const createQueryRunnerMock = jest.fn().mockImplementation(() => ({
    connect: connectMock,
    startTransaction: startTransactionMock,
    commitTransaction: commitTransactionMock,
    rollbackTransaction: rollbackTransactionMock,
    release: releaseMock,
    manager: managerMock,
  }));
  const dataSourceMock = { createQueryRunner: createQueryRunnerMock };
  return {
    connectMock,
    startTransactionMock,
    commitTransactionMock,
    rollbackTransactionMock,
    releaseMock,
    managerMock,
    createQueryRunnerMock,
    dataSourceMock,
  };
};
