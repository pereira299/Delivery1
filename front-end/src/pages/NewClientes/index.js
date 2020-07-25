import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import api from "../../services/api";
import InputMask from 'react-input-mask';


function NewClientes() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  async function handler(e) {
    e.preventDefault();

    const data = {
      name,
      cpf,
      address,
    };
    try {
      var valid = true;
      if(data.cpf.length < 14){
        alert("CPF invalido");
        valid = false;
      }
      if(data.name.length < 3){
        alert("nome invalido");
        valid = false;
      }
      if(data.address.length < 6){
        alert("Endereço invalido");
        valid = false;
      }
      if(valid){
        var res = await api.post("clientes", data, {});
        console.log(res);
        if (!isNaN(res.data[0])) {
          alert("Cliente cadastrado com sucesso!");
          history.push("/clientes");
        } else {
          alert("Ops! Algo deu errado\nTente novamente.");
        }
      }
    } catch (erro) {
      alert("Ops! Algo deu errado\nTente novamente.");
    }
  }
  return (
    <div className="col-lg-12 px-0">
      <div className="col-lg-12 bg-info py-2 mx-0 row">
        <h2 className="col-lg-4 text-light pl-5 header-text m-0">Delivery</h2>
        <Link to="/clientes" className="offset-lg-5 col-lg-3 px-5 row">
          <span>
            <IoIosArrowBack size={32} color="#ffffff" />
          </span>
          <h3 className="text-light subtitle-text m-0">Voltar</h3>
        </Link>
      </div>
      <div className="col-lg-10  offset-lg-1 pt-2">
        <h3 className="text-secondary col-lg-3 offset-lg-5 title-text">
          Novo cliente
        </h3>
        <form onSubmit={handler} className="col-lg-12 px-0 mx-0 mt-5">
          <input
            type="text"
            placeholder="Nome"
            className="col-lg-8 offset-lg-2 form-control"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="col-lg-8 offset-lg-2 mt-3 px-0 row">
            <InputMask
              type="text"
              placeholder="CPF"
              className="col-lg-3 form-control"
              onChange={(e) => setCpf(e.target.value)}
              mask="999.999.999-99"
            />
            <input
              type="text"
              placeholder="Endereço"
              className="col-lg-8 offset-lg-1 form-control"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="col-lg-8 offset-lg-2 btn btn-info btn-lg mt-3 form-control"
          >
            <p className="mb-0 sample-text">Salvar</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewClientes;
