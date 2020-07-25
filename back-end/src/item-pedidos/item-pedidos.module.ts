import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ItemPedidosController } from './controller/item-pedidos.controller';
import { ItemPedidoServices } from './provider/item-pedido.services';
import { ProdutoServices } from 'src/produtos/provider/produto.services';

@Module({
    imports:[DatabaseModule],
    controllers:[ItemPedidosController],
    providers:[ItemPedidoServices, ProdutoServices]
})
export class ItemPedidosModule {}
