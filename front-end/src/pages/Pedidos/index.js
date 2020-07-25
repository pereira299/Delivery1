import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiSearch, FiTrash } from "react-icons/fi";
import api from "../../services/api";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [qtdd, setQtdd] = useState([]);
  function getLink(id){
    return "/pedidos/"+id
  }
  function novaData(data){
    data = new Date(data);
    console.log(data);
    return data;
  }
  useEffect(() => {
      api.get("pedidos/").then( (res) => {
        setPedidos(res.data);
      });
    }, []);
    async function handleDel(id) {
      try {
        await api.delete("pedidos/" + id);
        setPedidos(pedidos.filter((pedido) => pedido.id !== id));
        alert("Pedido removido com sucesso!");
        var num = qtdd-1;
        setQtdd(num);
      } catch (erro) {
        alert("Erro ao deletar :(");
      }
    }
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
      <div className="col-lg-10  offset-lg-1 pt-2">
        <h3 className="text-secondary col-lg-3 offset-lg-5 title-text">
          Pedidos
        </h3>
        <Link to="/pedidos/novo" className="btn btn-info col-lg-2 offset-lg-10">
          <p className="m-0 font-weight-bold sample-text">Novo pedido</p>
        </Link>
        <div className="col-lg-12 px-0 mx-0 mt-3 row">
          {pedidos.map(pede => (
            <div className="ml-5 col-lg-5 ml-3 rounded-xs mt-3  pt-2 shadow bg-light" key={pede.id}>
            <div className="col-lg-12 px-0 mx-0 row">
              <div className="col-lg-11 px-0 mx-0">
                <div className="row col-lg-12 px-0 mx-0 mt-2">
                  <div className="col-lg-4 px-0 mx-0">
                    <label className="font-weight-bold">N° do pedido</label>
                    <p>{pede.orderNumber}</p>
                  </div>
                  <div className="col-lg-7 offset-lg-1 px-0 mx-0">
                    <label className="font-weight-bold">Data</label>
                    <p>{Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: 'numeric', day: 'numeric'}).format(novaData(pede.orderDate))}</p>
                  </div>
                </div>
                <div className="row col-lg-12 px-0 mx-0">
                  <div className="col-lg-4 px-0 mx-0">
                    <label className="font-weight-bold">Preço total</label>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pede.total)}</p>
                  </div>
                  <div className="col-lg-7 offset-lg-1 px-0 mx-0">
                    <label className="font-weight-bold">Nome do cliente</label>
                    <p>{pede.customerName}</p>
                  </div>
                </div>
                <Link to={getLink(pede.id)} className="btn btn-info btn-block mb-2">
                    <p className="m-0">Mais detalhes</p>
                </Link>
              </div>
              <FiTrash size={20} onClick={() => handleDel(pede.id)} className="col-lg-1 px-0 mx-0" />
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pedidos;
