require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const convert = require("xml-js");
const rateLimit = require("express-rate-limit");
var cors = require("cors");
const app = express();
const port = 3000;

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});


app.use(limiter);

// Allow CORS from any origin
app.use(cors());
app.get("/", (req, res) => res.send("Hello World!"));
// Routes
app.get("/api/search", async (req, res) => {
  try {
    const searchString = `q=${req.query.q}`;

    // It uses node-fetch to call the goodreads api, and reads the key from .env
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${searchString}&units=metric&appid=${process.env.WEATHER_API_KEY}`,
    );

    const results = JSON.parse(await response.text());

    return res.json({
      success: true,
      results,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
