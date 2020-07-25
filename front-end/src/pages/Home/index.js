import React from 'react';
import {Link} from 'react-router-dom';
import { MdPeople, MdShoppingBasket } from 'react-icons/md'
import { GrStackOverflow } from 'react-icons/gr'



function Home() {
    return (
        <div>
            <div className="col-lg-12 bg-info py-2">
                <h2 className="col-lg-4 text-light header-text m-0">Delivery</h2>
            </div>
            <div className="col-lg-12 px-0 py-5">
                <div className="row col-lg-12 py-5 px-0 mx-0">
                    <Link to="/Clientes" className="btn btn-info btn-large col-lg-4 py-5 offset-lg-1">
                        <div className="row col-lg-10 offset-lg-1">
                            <span className="offset-lg-2">
                                <MdPeople size={48} color="#ffffff" className="align-top"/>
                            </span>
                            <h3 className="my-2 offset-lg-1">Clientes</h3>
                        </div>
                    </Link>
                    <Link to="/Produtos" className="btn btn-info btn-large col-lg-4 py-5 offset-lg-2">
                        <div className="row col-lg-10 offset-lg-1">
                            <span className="offset-lg-2">
                                <MdShoppingBasket size={48} color="#ffffff" className="align-top"/>
                            </span>
                            <h3 className="my-2 offset-lg-1">Produtos</h3>
                        </div>
                    </Link>
                </div>
                <Link to="/Pedidos" className="btn btn-info btn-large col-lg-10 py-5 px-0 offset-lg-1">
                    <div className="row col-lg-10 offset-lg-2">
                        <span className="offset-lg-3">
                            <GrStackOverflow size={48} color="#ffffff" className="align-top"/>
                        </span>
                        <h3 className="my-2 offset-lg-1">Pedidos</h3>
                    </div>
                </Link>
            </div>

        </div>


    )
}

export default Home;