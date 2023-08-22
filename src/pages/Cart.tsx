import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Product, { CartProduct } from "../interfaces/product";

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
      (item) => item.id == product.id
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
        (item) => item.id == product.id
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
    <div>
      <Header />
      {list.map((item: CartProduct) => (
        <div key={item.id}>
          <img src={item.image} alt={item.name} width="400" height="250" />
          <p>{item.name}</p>
          <p>{item.price}</p>
          <button type="button" onClick={() => minusBtnHandler(item)}>-</button>
          <p>{item.count}</p>
          <button type="button" onClick={() => plusBtnHandler(item)}>
            +
          </button>
        </div>
      ))}
      <p>Valor da compra:R${totalHandler()}</p>
      <button type="button">Finalizar Compra</button>
    </div>
  );
}
