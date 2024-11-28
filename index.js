import express from "express";
const app = express();
// console.log(express);
// console.log(app);

const port = 3000;
app.use(express.json());
let teaData = [];
let nextID = 1;

app.get("/", (req, res) => {
  res.send("Hello Welcome to Home Page");
});

app.get("/about", (req, res) => {
  res.send("Welcome to about page");
});

//Route for the Tea
app.get("/teas", (req, res) => {
  return res.send(teaData);
});

//route for adding the tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextID++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get detials of a particular tea
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (tea) {
    res.send(tea);
  } else {
    res.status(404).send("Tea not found");
  }
});

//update tea details
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id == req.params.id);
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.send(tea);
});

//delete tea details
app.delete("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id == req.params.id);
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const index = teaData.indexOf(tea);
  teaData.splice(index, 1);
  res.send(tea);
});

app.listen(port, () => {
  console.log(`server running at http:Localhost:${port}`);
});
