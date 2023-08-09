import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/view1", (req, res) => {
  res.render("view1");
});

app.listen(PORT, () => {
  console.log("Escuchando al puerto " + PORT);
});
