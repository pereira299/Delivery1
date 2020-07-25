import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";

function FullPedidos() {
  const [pedidos, setPedido] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [produto, setProduto] = useState([]);

  var dt = window.location.href.replace("http://localhost:3000/pedidos/", "");
  dt = parseInt(dt);
  function novaData(data) {
    data = new Date(data);
    console.log(data);
    return data;
  }
  useEffect(() => {
    api.get("pedidos/" + dt).then((res) => {
      setPedido(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <div className="col-lg-12 bg-info py-2 mx-0 row">
        <h2 className="col-lg-4 text-light pl-5 header-text m-0">Delivery</h2>

        <Link to="/" className="offset-lg-5 col-lg-3 px-5 row">
          <span>
            <IoIosArrowBack size={32} color="#ffffff" />
          </span>
          <h3 className="text-light subtitle-text m-0">Voltar</h3>
        </Link>
      </div>
      <div>
        {pedidos.map((pede) => (
          <h3 className="text-secondary col-lg-3 offset-lg-5 title-text">
            Pedido {pede.orderNumber}
          </h3>
        ))}
        <div className="col-lg-6 offset-lg-3 px-0 mt-3 row">
          {pedidos.map((pede) => (
            <div className="row col-lg-12">
              <div className="col-lg-12">
                <label className="font-weight-bold">Cliente</label>
                <p>{pede.customerName}</p>
              </div>

              <div className="col-lg-6">
                <label className="font-weight-bold">Data</label>
                <p>
                  {Intl.DateTimeFormat("pt-BR", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }).format(novaData(pede.orderDate))}
                </p>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <label className="font-weight-bold">Preço total</label>
                <p>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pede.total)}
                </p>
              </div>
            
          <div className="col-lg-12">
            <label className="font-weight-bold">Pedidos</label>
            <ul>
                  {pede.itens.map((elem => (
                      <li>Qtdd: {elem.quantity} - Produto: {elem.productName} - Preço unitario: {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(elem.unitValue)}</li>
                  )))}
            </ul>
          </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FullPedidos;
