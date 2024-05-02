import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  @Post()
  public async create() {
    return 'Crea un producto';
  }

  @Get()
  public async findAll() {
    return this.productClient.send({ cmd: 'find_all_products' }, {});
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return `Regresa el product con id ${id} `;
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return `Elimina el product con id ${id} `;
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() body: any) {
    console.log(body);
    return `Actualiza el product con id ${id} `;
  }
}
