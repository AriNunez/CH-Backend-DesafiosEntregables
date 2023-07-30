import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(object) {
    try {
      const products = await this.getProducts();
      let id;
      let exists;

      if (
        !object.title ||
        !object.description ||
        !object.price ||
        !object.thumbnail ||
        !object.code ||
        !object.stock
      ) {
        return "ERROR! Uno de los campos se encuentra vacio";
      } else {
        exists = products.some((element) => {
          return element.code === object.code;
        });
      }

      if (exists) {
        return "ERROR! El campo code ya existe en la lista de productos";
      } else {
        !products.length
          ? (id = 1)
          : (id = products[products.length - 1].id + 1);
        products.push({ ...object, id });
        await fs.promises.writeFile(this.path, JSON.stringify(products));
      }
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

const productManager = new ProductManager("./Products.json");

// async function testing(){
//   let mensaje = await productManager.addProduct(  {
//     "title": "producto prueba",
//     "description": "Este es un producto prueba 9",
//     "price": 2009,
//     "thumbnail": "Sin imagen",
//     "code": "code9",
//     "stock": 9,
//     "id": 10
//   })

//   console.log(mensaje);

// }

// testing()

export default productManager;