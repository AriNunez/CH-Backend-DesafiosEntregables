const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(object) {
    try {
      const products = await this.getProducts();
      let id;

      !products.length ? (id = 1) : (id = products[products.length - 1].id + 1);

      products.push({ ...object, id });
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      return error;
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const datosArchivo = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(datosArchivo);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getProductById(idProduct) {
    try {
      const products = await this.getProducts();
      const product = products.find((element) => element.id === idProduct);

      return !product
        ? `No se encontró ningun producto con el id ${idProduct}`
        : product;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(idProduct, dataToUpdate) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex(
        (element) => element.id === idProduct
      );

      if (productIndex === -1) {
        return `No se encontró ningun producto con el id ${idProduct}`;
      }
      const product = products[productIndex];
      products[productIndex] = { ...product, ...dataToUpdate };
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(idProduct) {
    try {
      const products = await this.getProducts();
      const newProducts = products.filter(
        (element) => element.id !== idProduct
      );
      await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
    } catch (error) {
      return error;
    }
  }
}

const product1 = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};

const product2 = {
  title: "producto prueba 2",
  description: "Este es un producto prueba",
  price: 2000,
  thumbnail: "Sin imagen",
  code: "efg456",
  stock: 256,
};

const dataToUpdateProduct1 = {
  title: "producto prueba actualizado",
  stock: 45,
};

async function testing() {
  const manejador = new ProductManager("Products.json");
  let productos = await manejador.getProducts();
  let productoPorId;

  console.log(productos);

  await manejador.addProduct(product1);
  await manejador.addProduct(product2);
  // productos = await manejador.getProducts();
  // console.log(productos);

  // productoPorId = await manejador.getProductById(12);
  // console.log(productoPorId);
  // productoPorId = await manejador.getProductById(1);
  // console.log(productoPorId);

  // await manejador.updateProduct(1, dataToUpdateProduct1);
  // productos = await manejador.getProducts();
  // console.log(productos);
  // let noEncuentraUpdate = await manejador.updateProduct(
  //   22,
  //   dataToUpdateProduct1
  // );
  // console.log(noEncuentraUpdate);

  await manejador.deleteProduct(99);
  productos = await manejador.getProducts();
  console.log(productos);
  await manejador.deleteProduct(3);
  productos = await manejador.getProducts();
  console.log(productos);
}

testing();
