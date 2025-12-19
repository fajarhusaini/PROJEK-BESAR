const express = require("express");
const app = express();

const sequelize = require("./config/database");
const History = require("./models/History");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SYNC DATABASE
sequelize.sync()
  .then(() => {
    console.log("Database SQLite siap");
  })
  .catch(err => {
    console.error("DB error:", err);
  });

// ROUTE VIEW
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/proses", (req, res) => {
  res.render("proses");
});

app.get("/result", (req, res) => {
  res.render("result");
});

app.get("/history", async (req, res) => {
  try {
    const data = await History.findAll({
      order: [["createdAt", "DESC"]]
    });
    res.render("history", { data });
  } catch (err) {
    res.send("Error history: " + err.message);
  }
});

// SIMPAN DATA
app.post("/save", async (req, res) => {
  try {
    await History.create({
      barang: req.body.barang,
      mean: req.body.mean,
      median: req.body.median,
      modus: req.body.modus,
      toko: req.body.toko,
      harga: req.body.harga
    });
    res.sendStatus(200);
  } catch (err) {
    res.send("Error save: " + err.message);
  }
});

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});
