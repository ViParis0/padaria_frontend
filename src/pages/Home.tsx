import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import Product, { CartProduct } from "../interfaces/product";
import Footer from "../components/Footer";
import Cart from "../components/Cart";


const filterHandler = (arg: string, products: Product[]) => {
  return products.filter((item) =>
    item.name.toLocaleLowerCase().includes(arg.toLocaleLowerCase())
  );
};

const example = [
  { id: "1", image: "https://amopaocaseiro.com.br/wp-content/uploads/2020/01/pao-caseiro-para-iniciantes_02.jpg", name: "Pao de Sal", price: "0.99", category: "paes" },
  { id: "2", image: "https://www.doceriasaojose.com.br/estatico/doceriasaojose/images/temp/1500_pao-massinha-doce-pao-minuto-10-unidades-pct-com-280-g.jpeg?v=1599226056", name: "Pao de Doce", price: "1.50", category: "paes" },
  { id: "3", image: "https://assets.unileversolutions.com/recipes-v2/236948.jpg", name: "Cafe com Leite", price: "2.00", category: "bebidas" },
  { id: "4", image: "https://renata.com.br/images/receitas/193/renata-imagem-receitas-rocambole-de-chocolate-share.jpg", name: "Rocambole", price: "6.00", category: "sobremesas" },
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
        (item) => item.id === product.id
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
        products={example}
        calbackParent={(productList: Product[]) => setList(productList)}
      />
      <div className="flex mt-10 flex-col">
        {filter
          ? filterHandler(filter, list).map((item) => (
              <div 
              className="bg-white p-4 rounded-lg mx-auto my-2 w-1/2"
              key={item.id}>
                <img
                  className="w-38 h-36"
                  src={item.image}
                  alt={item.name}
                />
                <p className="text-2xl font-bold">{item.name}</p>
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
                <p>Preço: R${item.price}</p>
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
