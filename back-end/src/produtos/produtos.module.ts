import { Module } from '@nestjs/common';
import { ProdutosController } from './controller/produtos.controller';
import { ProdutoServices } from './provider/produto.services';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports:[DatabaseModule],
    controllers:[ProdutosController],
    providers:[ProdutoServices]
})
export class ProdutosModule {}
