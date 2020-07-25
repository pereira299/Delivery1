import { Module } from '@nestjs/common';
import { ClientesController } from './controller/clientes.controller';
import { ClienteServices } from './provider/cliente.services';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports:[DatabaseModule],
    controllers:[ClientesController],
    providers:[ClienteServices]
})
export class ClientesModule {}
