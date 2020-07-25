import { Controller, Param, Delete, Put, Body, Post, Get } from '@nestjs/common';
import { ProdutoServices } from '../provider/produto.services';
import { Produtos } from '../produtos';

@Controller('produtos')
export class ProdutosController {
    constructor(private produtoServices: ProdutoServices) {}

  private async jsonToEntity(json){
    const entity = json.map(element => {
      const produto = new Produtos();
      produto.code = element.code;
      produto.name = element.name;
      produto.id = element.id;
      produto.price = element.price;
      produto.stockQuantity = element.stockQuantity;

      return produto;
    });
    return entity;
  }

  @Get()
  async getAll() {
    let produto = await this.produtoServices.getAll();
    produto = this.jsonToEntity(produto)
    return produto;
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    let produto = await this.produtoServices.getById(id)
    produto = this.jsonToEntity(produto)
    return produto;
  }

  @Post()
  async create(@Body() pede: JSON) {
    const produto = await this.produtoServices.create(pede);
    return produto;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() pede: JSON) {
    const produto = await this.produtoServices.update(id, pede);
    return produto;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.produtoServices.delete(id);
  }
}
