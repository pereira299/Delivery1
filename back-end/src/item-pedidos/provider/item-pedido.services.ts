import { Injectable } from '@nestjs/common';
import { InjectKnex } from 'nestjs-knex';
import { ProdutoServices } from 'src/produtos/provider/produto.services';

@Injectable()
export class ItemPedidoServices {
    constructor(@InjectKnex() private readonly knex, private produtos: ProdutoServices) {}
    async buildOnce() {
      if (!(await this.knex.schema.hasTable('itemPedidos'))) {
        await this.knex.schema.createTable('itemPedidos', table => {
          table.increments('id').primary();
          table.integer('product');
          table.integer('order');
          table.integer('quantity');
          table.decimal('unitValue');
          table.decimal('totalValue');
        });
        return true;
      } else {
        return false;
      }
    }
    async getAll() {
      await this.buildOnce();
      const itemPedido = await this.knex.table('itemPedidos');
      return itemPedido;
    }
  
    async getByOrder(order: number) {
      await this.buildOnce();
      let itemPedido = await this.knex.table('itemPedidos').where('order', order);
      itemPedido = await Promise.all(
        itemPedido.map(async elem => {
          let produto = await this.produtos.getById(elem.product);
          try {
            elem['productName'] = produto[0].name;
          } catch (e) {
            elem['productName'] = 'Cliente desconhecido';
            
          }
          console.log(produto);
          return elem;
        }),
      );
      return itemPedido;
    }
  
    async create(item: JSON) {
      await this.buildOnce();
      const itemPedido = await this.knex.table('itemPedidos').insert(item);
      return itemPedido;
    }
  
    async update(id: number, item: JSON) {
      await this.buildOnce();
      const itemPedido = await this.knex
        .table('itemPedidos')
        .update(item)
        .where('id', id);
      return itemPedido;
    }
  
    async delete(id: number) {
      await this.buildOnce();
      await this.knex
        .table('itemPedidos')
        .where('id', id)
        .del();
    }

    async deleteByOrder(order: number) {
      await this.buildOnce();
      await this.knex
        .table('itemPedidos')
        .where('order', order)
        .del();
    }
}
