const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const port = 3000;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);

app.get("/", (req, res) => {
  res.json("website-a");
});

app.post("/github-event", (req, res) => {
  if (req.body.secret !== "secret123") {
    console.log('Wrong Secret')
    return res.status(400).json();
  }
  
  if (req.body.event == "event-a") {
    console.log('Incoming Webhook from event-a')
    return res.status(400).json();
  }

  if (req.body.event == "event-b") {
    console.log('Incoming Webhook from event-b')
    return res.status(400).json();
  }

  res.json('');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});