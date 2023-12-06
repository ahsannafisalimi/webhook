import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);

app.get("/", async (req, res) => {
  const response = await fetch("http://localhost:3000");
  const body = await response.text();

  console.log(body);
  res.json("website-b");
});

app.get("/trigger-webhook-event-a", async (req, res) => {
  try {
    const data = {
      secret: "secret123",
      event: "event-a"
    };

    const response = await fetch("http://localhost:3000/github-event", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    res.json("Webhook event-a triggered");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/trigger-webhook-event-b", async (req, res) => {
  try {
    const data = {
      secret: "secret123",
      event: "event-b"
    };

    const response = await fetch("http://localhost:3000/github-event", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    res.json("Webhook event-b triggered");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});