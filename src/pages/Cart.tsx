import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { CartProduct } from "../interfaces/product";

export default function Cart() {
  const [list, setList] = useState([] as CartProduct[]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setList(JSON.parse(cart));
    }
  }, []);

  const plusBtnHandler = (product: CartProduct) => {
    const stringCart = localStorage.getItem("cart") || "";
    const cartStorage: CartProduct[] = JSON.parse(stringCart);
    const productFind: CartProduct | undefined = cartStorage.find(
      (item) => item.id === product.id
    );
    if (productFind) {
      const index = cartStorage.indexOf(productFind);
      productFind.count += 1;
      cartStorage.splice(index, 1, productFind);
    }
    localStorage.setItem("cart", JSON.stringify(cartStorage));
    setList(cartStorage);
  };

  const minusBtnHandler = (product: CartProduct) => {
    if (product.count > 0) {
      const stringCart = localStorage.getItem("cart") || "";
      const cartStorage: CartProduct[] = JSON.parse(stringCart);
      const productFind: CartProduct | undefined = cartStorage.find(
        (item) => item.id === product.id
      );
      if (productFind) {
        const index = cartStorage.indexOf(productFind);
        productFind.count -= 1;
        cartStorage.splice(index, 1, productFind);
      }
      localStorage.setItem("cart", JSON.stringify(cartStorage));
      setList(cartStorage);
    }
  };

  const totalHandler = () => {
    return list.reduce(
      (acc, item: CartProduct) =>
        (acc += Number(item.price) * Number(item.count)),
      0
    );
  };

  return (
    <div className="md:w-1/2 m-auto min-h-screen bg-slate-200">
      <Header />
      {list.map((item: CartProduct) => (
        <div
          className="bg-white p-4 rounded-lg mx-auto my-2 w-1/2 flex flex-col"
          key={item.id}
        >
          <img src={item.image} alt={item.name} className="w-38 h-38" />
          <p className="text-2xl font-bold">{item.name}</p>
          <p>Preço: R$ {item.price}</p>
          <div className="flex justify-around">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={() => minusBtnHandler(item)}
            >
              -
            </button>
            <p>{item.count}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={() => plusBtnHandler(item)}
            >
              +
            </button>
          </div>
        </div>
      ))}
      <p className="text-center text-2xl font-bold">
        Valor da compra: R$ {totalHandler()}
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        type="button"
      >
        Finalizar Compra
      </button>
    </div>
  );
}
