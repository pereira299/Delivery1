import { Clientes } from "src/clientes/clientes";

export class Pedidos {
    id: number;
    orderNumber: number;
    orderDate: Date;
    total: number;
    customer: Clientes;
}
