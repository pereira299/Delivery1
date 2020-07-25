import { Module } from '@nestjs/common';
import { PedidosServices } from './provider/pedidos.services';
import { DatabaseModule } from 'src/database/database.module';
import { ItemPedidoServices } from 'src/item-pedidos/provider/item-pedido.services';
import { ClienteServices } from 'src/clientes/provider/cliente.services';
import { PedidosController } from './controller/pedidos/pedidos.controller';
import { ProdutoServices } from 'src/produtos/provider/produto.services';

@Module({
  imports:[DatabaseModule],
  providers: [PedidosServices, ItemPedidoServices, ClienteServices, ProdutoServices],
  controllers: [PedidosController]
})
export class PedidosModule {}
