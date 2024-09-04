const express = require("express");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
const app = express();

app.use(express.json());

let products = JSON.parse(localStorage.getItem("products")) || [];

app.post("/products", (req, res) => {
  const product = {
    id: products.length + 1,
    product: req.body.product,
  };
  products.push(product);

  localStorage.setItem("products", JSON.stringify(products));

  res.status(201).json(products);
});

app.get("/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/products/:id", (req, res) => {
    if(products.length>1){
        const product = products.find((product)=> product.id === parseInt(req.params.id));
        if(product){
            res.status(200).json(product);
        }else res.status(400).json({message: "Product not found!"});
    }else res.status(400).json({message: "Product not found!"});
  });

app.put('/products/:id', (req, res)=>{
    if(products.length>1){
        const product = products.find((product)=> product.id === parseInt(req.params.id));
        if(product){
            product.product = req.body.product;
            localStorage.setItem("products", JSON.stringify(products));
            res.status(200).json(product);
        }else res.status(400).json({message: "Product not found!"});
    }else res.status(400).json({message: "Product not found!"});
});

app.delete('/products/:id', (req, res)=>{
    if(products.length>1){
        const product = products.find(product=> product.id === parseInt(req.params.id));
        if(product){
            products.splice(product, 1);
            localStorage.setItem("products", JSON.stringify(products));
            res.status(204).json({message: "Product deleted successfully."});
        }else res.status(400).json({message: "Product not found!"});
    }else res.status(400).json({message: "Product not found!"});
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
