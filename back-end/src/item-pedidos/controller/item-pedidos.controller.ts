import {
  Controller,
  Param,
  Delete,
  Body,
  Put,
  Post,
  Get,
} from '@nestjs/common';
import { ItemPedidos } from '../item-pedidos';
import { ItemPedidoServices } from '../provider/item-pedido.services';
import { ProdutoServices } from 'src/produtos/provider/produto.services';

@Controller('item-pedidos')
export class ItemPedidosController {
  constructor(
    private itemPedidoServices: ItemPedidoServices
  ) {}

  private async jsonToEntity(json) {
    const entity = json.map(element => {
      const itemPedido = new ItemPedidos();
      itemPedido.order = element.order;
      itemPedido.product = element.product;
      itemPedido.id = element.id;
      itemPedido.quantity = element.quantity;
      itemPedido.totalValue = element.totalValue;
      itemPedido.unitValue = element.unitValue;

      return itemPedido;
    });
    return entity;
  }

  @Get()
  async getAll() {
    let itemPedido = await this.itemPedidoServices.getAll();
    itemPedido = this.jsonToEntity(itemPedido);
    return itemPedido;
  }

  @Get(':id')
  async getByOrder(@Param('order') order: number) {
    let itemPedido = await this.itemPedidoServices.getByOrder(order);
    return itemPedido;
  }

  @Post()
  async create(@Body() item: JSON) {
    const itemPedido = await this.itemPedidoServices.create(item);
    return itemPedido;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() item: JSON) {
    const itemPedido = await this.itemPedidoServices.update(id, item);
    return itemPedido;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.itemPedidoServices.delete(id);
  }
}
