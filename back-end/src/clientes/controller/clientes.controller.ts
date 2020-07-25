import { Controller, Post, Put, Delete, Param, Body, Get } from '@nestjs/common';
import { ClienteServices } from '../provider/cliente.services';
import { Clientes } from '../clientes';

@Controller('clientes')
export class ClientesController {
    constructor(private clienteService: ClienteServices) {}

  private async jsonToEntity(json){
    const entity = json.map(element => {
      const cliente = new Clientes();
      cliente.address = element.address;
      cliente.cpf = element.cpf;
      cliente.id = element.id;
      cliente.name = element.name;

      return cliente;
    });
    return entity;
  }

  @Get()
  async getAll() {
    let cliente = await this.clienteService.getAll();
    ;
    return cliente;
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    let cliente = await this.clienteService.getById(id)
    ;
    return cliente;
  }

  @Post()
  async create(@Body() client: JSON) {
    const cliente = await this.clienteService.create(client);
    return cliente;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() client: JSON) {
    const cliente = await this.clienteService.update(id, client);
    return cliente;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.clienteService.delete(id);
  }
}
