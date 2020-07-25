import { Test, TestingModule } from '@nestjs/testing';
import { PedidosServices } from './pedidos.services';

describe('PedidosServices', () => {
  let provider: PedidosServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidosServices],
    }).compile();

    provider = module.get<PedidosServices>(PedidosServices);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
