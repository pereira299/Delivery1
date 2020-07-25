import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiSearch, FiTrash } from "react-icons/fi";
import api from "../../services/api";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [qtdd, setQtdd] = useState([]);
  useEffect(() => {
      api.get("produtos/").then( (res) => {
        setProdutos(res.data);
      });
    }, []);
    async function handleDel(id) {
      try {
        await api.delete("produtos/" + id);
        setProdutos(produtos.filter((produto) => produto.id !== id));
        alert("Produto removido com sucesso!");
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
          Produtos
        </h3>
        <Link
          to="/produtos/novo"
          className="btn btn-info col-lg-2 offset-lg-10"
        >
          <p className="m-0 font-weight-bold sample-text">Novo produto</p>
        </Link>
        <div className="col-lg-12 px-0 mx-0 mt-3 row">
          {produtos.map(prod => (
            <div className="ml-5 col-lg-5 ml-3 rounded-xs mt-3 row pt-2 shadow bg-light" key={prod.id}>
            <div className="col-lg-11 px-0 mx-0">
              <div className="row col-lg-12 px-0 mx-0 mt-2">
                <div className="col-lg-3 px-0 mx-0">
                  <label className="font-weight-bold">Codigo</label>
                  <p>{prod.code}</p>
                </div>
                <div className="col-lg-8 offset-lg-1 px-0 mx-0">
                  <label className="font-weight-bold">Nome</label>
                  <p>{prod.name}</p>
                </div>
              </div>
              <div className="row col-lg-12 px-0 mx-0">
                <div className="col-lg-4 px-0 mx-0">
                  <label className="font-weight-bold">Preço</label>
                  <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.price)}</p>
                </div>
                <div className="col-lg-7 offset-lg-1 px-0 mx-0">
                  <label className="font-weight-bold">Qtdd. em estoque</label>
                  <p>{prod.stockQuantity}</p>
                </div>
              </div>
            </div>
            <FiTrash size={20} onClick={() => handleDel(prod.id)} className="col-lg-1 px-0 mx-0" />
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Produtos;
