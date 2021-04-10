import {TestSandbox} from '@loopback/testlab';
import {exec} from 'child_process';

describe('Prisma Integration', () => {
  const sandbox = new TestSandbox('../../.sandbox');
  beforeEach(() => sandbox.reset());
  after(() => sandbox.delete());

  exec('');
});
