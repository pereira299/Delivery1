import { Test, TestingModule } from '@nestjs/testing';
import { ItemPedidoServices } from './item-pedido.services';

describe('ItemPedidoServices', () => {
  let provider: ItemPedidoServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemPedidoServices],
    }).compile();

    provider = module.get<ItemPedidoServices>(ItemPedidoServices);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
