import React from "react";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Pedidos from "./pages/Pedidos";
import Produtos from "./pages/Produtos";
import NewClientes from "./pages/NewClientes";
import NewPedidos from "./pages/NewPedidos";
import NewProdutos from "./pages/NewProdutos";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import FullPedidos from "./pages/FullPedido";

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/clientes" exact component={Clientes}/>
                <Route path="/pedidos" exact component={Pedidos}/>
                <Route path="/produtos" exact component={Produtos}/>
                <Route path="/clientes/novo" component={NewClientes}/>
                <Route path="/pedidos/novo" component={NewPedidos}/>
                <Route path="/pedidos/:id" exact component={FullPedidos}/>
                <Route path="/produtos/novo" component={NewProdutos}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;