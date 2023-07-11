class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let productToAdd;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return "ERROR! Uno de los campos se encuentra vacio";
    } else {
      let exists = this.products.some((element) => {
        return element.code === code;
      });

      if (exists) {
        return "ERROR! El campo code ya existe en la lista de productos";
      } else {
        productToAdd = {
          title: title,
          description: description,
          price: price,
          thumbnail: thumbnail,
          code: code,
          stock: stock,
          id:
            this.products.length === 0
              ? 1
              : this.products[this.products.length - 1].id + 1,
        };

        this.products.push(productToAdd);
        return "SUCCESS! Producto agregado";
      }
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    let productToReturn = this.products.find((element) => {
      return element.id === id;
    });

    return productToReturn || "Not Found";
  }
}

const manejador = new ProductManager();

console.log(manejador.getProducts());

console.log(
  manejador.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  )
);

console.log(manejador.getProducts());

console.log(
  manejador.addProduct(
    "producto prueba numero 2",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  )
);

console.log(
  manejador.addProduct(
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  )
);

console.log(manejador.getProducts());

console.log(
  manejador.addProduct(
    "producto prueba numero 2",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "123abc",
    25
  )
);

console.log(manejador.getProducts());

console.log("\n PRUEBA GET ELEMENT BY ID");
console.log(manejador.getProductById(2));
console.log(manejador.getProductById(50));
