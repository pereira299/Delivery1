import { Injectable } from '@nestjs/common';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class PedidosServices {
    constructor(@InjectKnex() private readonly knex) {}
    async buildOnce() {
      if (!(await this.knex.schema.hasTable('pedidos'))) {
        await this.knex.schema.createTable('pedidos', table => {
          table.increments('id').primary();
          table.integer('orderNumber');
          table.date('orderDate');
          table.decimal('total');
          table.integer('customer');
        });
        return true;
      } else {
        return false;
      }
    }
    async getAll() {
      await this.buildOnce();
      const pedido = await this.knex.table('pedidos');
      return pedido;
    }
  
    async getById(id: number) {
      await this.buildOnce();
      const pedido = await this.knex.table('pedidos').where('id', id);
      return pedido;
    }
  
    async create(pede: JSON) {
      await this.buildOnce();
      const pedido = await this.knex.table('pedidos').insert(pede);
      return pedido;
    }
  
    async update(id: number, pede: JSON) {
      await this.buildOnce();
      const pedido = await this.knex
        .table('pedidos')
        .update(pede)
        .where('id', id);
      return pedido;
    }
  
    async delete(id: number) {
      await this.buildOnce();
      await this.knex
        .table('pedidos')
        .where('id', id)
        .del();
    }
}
