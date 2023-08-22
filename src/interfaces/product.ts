export default interface Product {
    id: string,
    image: string,
    name: string,
    price: string,
}

export interface CartProduct extends Product {
    count: number
  }