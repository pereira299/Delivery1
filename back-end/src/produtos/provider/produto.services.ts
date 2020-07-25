import { Injectable } from '@nestjs/common';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class ProdutoServices {
    constructor(@InjectKnex() private readonly knex) {}
    async buildOnce() {
      if (!(await this.knex.schema.hasTable('produtos'))) {
        await this.knex.schema.createTable('produtos', table => {
          table.increments('id').primary();
          table.string('code');
          table.string('name');
          table.decimal('price');
          table.integer('stockQuantity');
        });
        return true;
      } else {
        return false;
      }
    }
    async getAll() {
      await this.buildOnce();
      const produto = await this.knex.table('produtos');
      return produto;
    }
  
    async getById(id: number) {
      await this.buildOnce();
      const produto = await this.knex.table('produtos').where('id', id);
      return produto;
    }
  
    async create(prod: JSON) {
      await this.buildOnce();
      const produto = await this.knex.table('produtos').insert(prod);
      return produto;
    }
  
    async update(id: number, prod: JSON) {
      await this.buildOnce();
      const produto = await this.knex
        .table('produtos')
        .update(prod)
        .where('id', id);
      return produto;
    }
  
    async delete(id: number) {
      await this.buildOnce();
      await this.knex
        .table('produtos')
        .where('id', id)
        .del();
    }
}
