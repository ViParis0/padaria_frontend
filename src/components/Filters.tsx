import React from "react";
import Product from "../interfaces/product";

export default function Filters(props: any) {
  const handleClick = ({ target }: any) => {
    // chamada a API passando o value, despois setar o estado com o retorno da API
    const list = props.products.filter((product: Product) => product.category === target.value)
    props.calbackParent(list)
    console.log(target.value);
  };

  return (
    <div className="flex bg-red-800 p-2 mt-8 justify-around" id="filter">
      <button type="button" className="" value="comidas" onClick={(e) => handleClick(e)}>
        Comidas
      </button>
      <button type="button" value="bebidas" onClick={(e) => handleClick(e)}>
        Bebidas
      </button>
      <button type="button" value="paes" onClick={(e) => handleClick(e)}>
        Pães
      </button>
      <button type="button" value="sobremesas" onClick={(e) => handleClick(e)}>
        Sobremesas
      </button>
    </div>
  );
}
