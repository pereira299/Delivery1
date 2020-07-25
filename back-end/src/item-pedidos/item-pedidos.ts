import { Produtos } from "src/produtos/produtos";
import { Pedidos } from "src/pedidos/pedidos";

export class ItemPedidos {
    id: number;
    product: Produtos;
    order: Pedidos;
    quantity: number;
    unitValue: number;
    totalValue: number;
}
