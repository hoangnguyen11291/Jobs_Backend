const express = require("express");
const logger = require("morgan");
const app = express();
app.use(logger("dev"));
const port = 5000;
const data = require("./data.json");

// READ
app.get("/", (req, res) => {
  res.send(data);
  // res.send("Hello World!");
});

app.get("/companies", (req, res) => {
  res.send(data.companies);
});

app.get("/jobs", (req, res) => {
  const page = req.query.page;
  const limit = 20;
  const start = (page - 1) * limit;
  const end = page * limit;

  if (!req.query.page) {
    res.send(data.jobs.slice(0, 19));
  } else {
    const result = data.jobs.slice(start, end);
    res.send(result);
  }
});

// CREATE

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
