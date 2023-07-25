import express from "express";
import productManager from "./ProductManager.js";

const puerto = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const { limit } = req.query;

    if (!+limit) {
      return res.status(200).json({ products });
    } else {
      let productosLimitados = [];
      for (let i = 0; i < +limit; i++) {
        products[i] ? productosLimitados.push(products[i]) : null;
      }
      return res.status(200).json({ productosLimitados });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(+pid);
    res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.listen(puerto, () => {
  console.log("Conexión exitosa con puerto " + puerto);
});
