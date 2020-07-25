import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import api from "../../services/api";
import CurrencyInput from "react-currency-masked-input";

function NewPedidos() {
  const history = useHistory();
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [total, setTotal] = useState();
  const [iten, setIten] = useState([]);
  const [customer, setCustomer] = useState();
  const [clientes, setCliente] = useState([]);
  const [produtos, setProduto] = useState([]);
  var itens = [];
  useEffect(() => {
    api.get("clientes/").then((res) => {
      setCliente(res.data);
    });
    api.get("produtos/").then((res) => {
      setProduto(res.data);
    });
  }, []);
  function setItem(qtdd, id) {
      id = parseInt(id.replace("prod",""))
    var item = produtos.map((elem) => {
      if (elem.id === id) {
        var res = {
          product: id,
          order: 1,
          quantity: parseInt(qtdd),
          unitValue: elem.price,
          totalValue: elem.price * qtdd,
        };
        return res;
      }
    });
    item = item.filter((elem) => elem !== undefined)
    
    var preco = 0;
    var possui = false;
    itens = iten.map((elem) => {
        if(elem.product == id){
            possui = true
            return item[0]
        }else{
            return elem
        }
    })
    if(!possui){
        itens[iten.length] = item[0];
    }
    itens = itens.filter((elem) => elem !== undefined)
    preco = itens.reduce((sum, elem) => {return sum + elem.totalValue}, 0)
    console.log(preco);
    setTotal(preco);
    setIten(itens);
   
  }
  async function handler(e) {
    e.preventDefault();
    var itens = iten
    const data = {
      orderNumber,
      orderDate,
      total,
      customer,
      itens
    };
    try {
      var valid = true;
      if (data.orderNumber.length < 2) {
        alert("N° do Pedido invalido");
        valid = false;
      }
      data.orderNumber = parseInt(data.orderNumber);
      data.total = parseFloat(data.total);
      data.customer = parseInt(data.customer);
      if(isNaN(data.customer) || data.customer < 1) {
        alert("Cliente invalido");
        valid = false;
      }
      if (valid) {
        var res = await api.post("pedidos", data);
        if (!isNaN(res.data[0])) {
          alert("Pedido cadastrado com sucesso!");
          history.push("/pedidos");
        } else {
          alert("Ops! Algo deu errado\nTente novamente1.");
        }
      }
    } catch (erro) {
      alert("Ops! Algo deu errado\nTente novamente.\n "+erro);
    }
  }
  return (
    <div className="col-lg-12 px-0">
      <div className="col-lg-12 bg-info py-2 mx-0 row">
        <h2 className="col-lg-4 text-light pl-5 header-text m-0">Delivery</h2>
        <Link to="/pedidos" className="offset-lg-5 col-lg-3 px-5 row">
          <span>
            <IoIosArrowBack size={32} color="#ffffff" />
          </span>
          <h3 className="text-light subtitle-text m-0">Voltar</h3>
        </Link>
      </div>
      <div className="col-lg-10  offset-lg-1 pt-2">
        <h3 className="text-secondary col-lg-3 offset-lg-5 title-text">
          Novo Pedido
        </h3>
        <form onSubmit={handler} className="col-lg-12 px-0 mx-0 mt-5">
          <div className="col-lg-8 offset-lg-2 mt-3 px-0 row">
            <input
              type="text"
              placeholder="N° do Pedido"
              className="col-lg-3 form-control"
              onChange={(e) => setOrderNumber(e.target.value)}
            />
            <input
              type="date"
              placeholder="Data"
              className="col-lg-8 offset-lg-1 form-control"
              onChange={(e) => setOrderDate(e.target.value)}
            />
            
          </div>
          <div className="col-lg-8 offset-lg-2 mt-3 px-0 row">
            <CurrencyInput
              placeholder="Preço Total"
              id="precoTotal"
              value={total}
              disabled="disabled"
              className="col-lg-5 form-control"
              onChange={(e) => setTotal(e.target.value)}
            />
            <select
            className="col-lg-6 offset-lg-1 form-control mt-2"
            onChange={(e) => setCustomer(e.target.value)}
          >
              <option value="0">Selecione o cliente...</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>{cliente.name}</option>
            ))}
          </select>
          </div>
          
          <p className="col-lg-8 offset-lg-2 mt-2">Produtos:</p>
          <div className="col-lg-8 offset-lg-2 mt-2">
            {produtos.map((prod) => {
              if (prod.stockQuantity > 0) {
                var id = "prod" + prod.id;
                return (
                  <div key={prod.id} className="row col-lg-12 mt-2">
                    <input
                      type="number"
                      className="form-control-sm col-lg-1"
                      id={id}
                      min="0"
                      onChange={(e) => setItem(e.target.value, id)}
                    />
                    <h5 className="sample-text my-0 ml-3">{prod.name}</h5>
                    <p className="sample-text my-0 ml-3">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.price)}</p>
                  </div>
                );
              }
            })}
          </div>
          <button
            type="submit"
            className="col-lg-8 offset-lg-2 btn btn-info btn-lg mt-3 form-control"
          >
            <p className="mb-0 sample-text" >Pedir selecionados</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPedidos;
