import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import Product, { CartProduct } from "../interfaces/product";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

const link =
  "https://espetinhodesucesso.com.br/wp-content/uploads/2021/11/O-que-fazer-com-caldo-de-carne-que-sobrou-pirao.jpg";

const filterHandler = (arg: string, products: Product[]) => {
  return products.filter((item) =>
    item.name.toLocaleLowerCase().includes(arg.toLocaleLowerCase())
  );
};

const example = [
  { id: "1", image: link, name: "caldo de mandioca", price: "123" },
  { id: "2", image: link, name: "caldo de mandioca", price: "123" },
  { id: "3", image: link, name: "caldo de mandioca", price: "123" },
  { id: "4", image: link, name: "Molho de tomate", price: "123" },
];

export default function Home() {
  const [list, setList] = useState(example);
  const [filter, setFilter] = useState("");
  const [cart, setCart] = useState(0);

  const countCart = (cartList: CartProduct[]) => {
    let items = 0;
    cartList.forEach((item) => (items += item.count));
    setCart(items);
  };

  const addHandler = (product: Product) => {
    if (localStorage.getItem("cart")) {
      const stringCart = localStorage.getItem("cart") || "";
      const cartStorage: CartProduct[] = JSON.parse(stringCart);
      const productFind: CartProduct | undefined = cartStorage.find(
        (item) => item.id == product.id
      );
      if (productFind) {
        const index = cartStorage.indexOf(productFind);
        productFind.count += 1;
        cartStorage.splice(index, 1, productFind);
      } else {
        const newProduct = { ...product, count: 1 };
        cartStorage.push(newProduct);
      }

      localStorage.setItem("cart", JSON.stringify(cartStorage));
      countCart(cartStorage);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const cartStorage = localStorage.getItem("cart") || "";
      const cart = JSON.parse(cartStorage);
      countCart(cart);
    }
  }, [cart]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (!cart) {
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      // setCart(JSON.parse(cart))
    }
  }, []);

  return (
    <main className="md:w-1/2 m-auto min-h-screen bg-slate-200">
      <Header filter={filter} setFilter={(value: any) => setFilter(value)} />
      <Filters
        calbackParent={(productList: Product[]) => setList(productList)}
      />
      <div className="flex mt-10 flex-col">
        {filter
          ? filterHandler(filter, list).map((item) => (
              <div key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  width="400"
                  height="250"
                />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  onClick={() => addHandler(item)}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))
          : list.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg mx-auto my-2 w-1/2"
              >
                <img src={item.image} alt={item.name} className="w-38 h-36" />
                <p className="text-2xl font-bold">{item.name}</p>
                <p>Preço: R${item.price}.00</p>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                 focus:ring-blue-300 font-medium rounded-lg text-sm w-full
                  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600
                   dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  onClick={() => addHandler(item)}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
      </div>
      <Cart cart={cart} />
      <Footer />
    </main>
  );
}
