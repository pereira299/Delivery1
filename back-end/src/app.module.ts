import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ItemPedidosModule } from './item-pedidos/item-pedidos.module';

@Module({
  imports: [ClientesModule, PedidosModule, ProdutosModule, ItemPedidosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
