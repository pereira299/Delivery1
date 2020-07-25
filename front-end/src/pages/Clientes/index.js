import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiSearch, FiTrash } from "react-icons/fi";
import api from "../../services/api";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [qtdd, setQtdd] = useState();
  useEffect(() => {
    api.get("clientes/").then((res) => {
      setClientes(res.data);
      setQtdd(res.data.lenght)
    });
  }, [qtdd]);
  async function handleDel(id) {
    try {
      await api.delete("clientes/" + id);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
      alert("Cliente removido com sucesso!");
      var num = qtdd-1;
      setQtdd(num);
    } catch (erro) {
      alert("Erro ao deletar :(");
    }
  }
  return (
    <div className="col-lg-12 px-0">
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
          Clientes
        </h3>
        <Link
          to="/clientes/novo"
          className="btn btn-info col-lg-2 offset-lg-10"
        >
          <p className="m-0 font-weight-bold sample-text">Novo Cliente</p>
        </Link>
        <div className="col-lg-12 px-0 mx-0 mt-3 row">
          {clientes.map((cliente) => (
            <div
              className="ml-5 col-lg-5 ml-3 rounded-xs mt-3 shadow bg-light pt-3 row"
              key={cliente.id}
            >
              <div className="col-lg-11 px-0 mx-0">
                <div className="row col-lg-12 px-0 mx-0">
                  <div className="col-lg-8 px-0 mx-0">
                    <label className="font-weight-bold">Nome</label>
                    <p>{cliente.name}</p>
                  </div>
                </div>
                <div className="row col-lg-12 px-0 mx-0">
                  <div className="col-lg-4 px-0 mx-0">
                    <label className="font-weight-bold">CPF</label>
                    <p>{cliente.cpf}</p>
                  </div>
                  <div className="col-lg-7 px-0 ml-4 offset-lg-1">
                    <label className="font-weight-bold">Endereço</label>
                    <p>{cliente.address}</p>
                  </div>
                </div>
              </div>
              <FiTrash
                size={20}
                onClick={() => handleDel(cliente.id)}
                className="col-lg-1 px-0 mx-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Clientes;
