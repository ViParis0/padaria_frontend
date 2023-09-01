import React from "react";
import Product from "../interfaces/product";
import example from "../helpers/productList";

export default function Filters(props: any) {
  const handleClick = ({ target }: any) => {
    // chamada a API passando o value, despois setar o estado com o retorno da API
    const list = example.filter((product: Product) => target.value === 'todos'? product : product.category === target.value)
    props.calbackParent(list)
  };

  return (
    <div className="flex bg-red-800 p-2 mt-8 justify-around" id="filter">
      <button type="button" className="" value="todos" onClick={(e) => handleClick(e)}>
        Todos
      </button>
      <button type="button" value="paes" onClick={(e) => handleClick(e)}>
        Pães
      </button>
      <button type="button" value="bebidas" onClick={(e) => handleClick(e)}>
        Bebidas
      </button>
      <button type="button" value="sobremesas" onClick={(e) => handleClick(e)}>
        Sobremesas
      </button>
    </div>
  );
}
