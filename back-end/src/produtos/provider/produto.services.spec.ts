import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoServices } from './produto.services';

describe('ProdutoServices', () => {
  let provider: ProdutoServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutoServices],
    }).compile();

    provider = module.get<ProdutoServices>(ProdutoServices);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
