import { Injectable } from '@nestjs/common';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class ClienteServices {
    constructor(@InjectKnex() private readonly knex) {}
    async buildOnce() {
      if (!(await this.knex.schema.hasTable('clientes'))) {
        await this.knex.schema.createTable('clientes', table => {
          table.increments('id').primary();
          table.string('name');
          table.string('cpf');
          table.string('address');
        });
        return true;
      } else {
        return false;
      }
    }
    async getAll() {
      this.buildOnce();
      const cliente = await this.knex.table('clientes');
      return cliente;
    }
  
    async getById(id: number) {
      this.buildOnce();
      const cliente = await this.knex.table('clientes').where('id', id);
      return cliente;
    }
  
    async create(client: JSON) {
      this.buildOnce();
      const cliente = await this.knex.table('clientes').insert(client);
      return cliente;
    }
  
    async update(id: number, client: JSON) {
      this.buildOnce();
      const cliente = await this.knex
        .table('clientes')
        .update(client)
        .where('id', id);
      return cliente;
    }
  
    async delete(id: number) {
      this.buildOnce();
      await this.knex
        .table('clientes')
        .where('id', id)
        .del();
    }
}
