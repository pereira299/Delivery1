import { Test, TestingModule } from '@nestjs/testing';
import { ItemPedidosController } from './item-pedidos.controller';

describe('ItemPedidos Controller', () => {
  let controller: ItemPedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemPedidosController],
    }).compile();

    controller = module.get<ItemPedidosController>(ItemPedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
