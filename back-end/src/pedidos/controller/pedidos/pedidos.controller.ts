import { Controller, Delete, Param, Put, Body, Post, Get } from '@nestjs/common';
import { PedidosServices } from '../../provider/pedidos.services';
import { ItemPedidoServices } from 'src/item-pedidos/provider/item-pedido.services';
import { ClienteServices } from 'src/clientes/provider/cliente.services';

@Controller('pedidos')
export class PedidosController {
    constructor(private pedidoService: PedidosServices, private itemPedido: ItemPedidoServices, private clientes: ClienteServices) {}

  @Get()
  async getAll() {
    let pedido = await this.pedidoService.getAll();
    pedido = await Promise.all(pedido.map(async (elem) => {
      let itens = await this.itemPedido.getByOrder(elem.id);
      elem["itens"] = itens;
      let cliente = await this.clientes.getById(elem.customer);
    try{
        elem["customerName"] = cliente[0].name;
    }catch(e){
        elem["customerName"] = "Cliente desconhecido"
        console.log(cliente)
    }
     
      return elem;
    }))
    console.log(pedido)
    return pedido;
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    let pedido = await this.pedidoService.getById(id);
    console.log("aqui1");
    pedido = await Promise.all(pedido.map(async (elem) => {
      let itens = await this.itemPedido.getByOrder(elem.id);
      elem["itens"] = itens;
      let cliente = await this.clientes.getById(elem.customer);
    try{
        elem["customerName"] = cliente[0].name;
    }catch(e){
        elem["customerName"] = "Cliente desconhecido"
        console.log(cliente)
    }
      return elem;
    }))
    return pedido;
  }

  @Post()
  async create(@Body() pede: JSON) {
    console.log(pede);
    let itens = pede["itens"];
    delete pede["itens"];
    const pedido = await this.pedidoService.create(pede);
    itens.map( elem => {
      elem.order = pedido[0];
      this.itemPedido.create(elem);
      return elem;
    });
    return pedido;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() pede: JSON) {
    let itens = pede["itens"];
    delete pede["itens"];
    let pedido = await this.pedidoService.update(id, pede);
    itens.map(elem => {
      const id = elem.id;
      this.itemPedido.update(id,elem);
    })
    return pedido;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.itemPedido.deleteByOrder(id)
    await this.pedidoService.delete(id);
  }
}
