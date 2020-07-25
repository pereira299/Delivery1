import { Test, TestingModule } from '@nestjs/testing';
import { ClienteServices } from './cliente.services';

describe('ClienteServices', () => {
  let provider: ClienteServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteServices],
    }).compile();

    provider = module.get<ClienteServices>(ClienteServices);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
