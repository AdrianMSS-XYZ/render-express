const express = require("express");
var cors = require('cors');
const winston = require("winston");
const app = express();
const port = process.env.PORT || 3001;

let lightState = 'off';
let phValue = '';

app.use(cors());
app.options('*', cors());
app.use(express.static('public'));
app.use(express.json());

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
 });

const logger = winston.createLogger({
  // Log only if level is less than (meaning more severe) or equal to this
  level: "info",
  // Use timestamp and printf to create a standard log format
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  // Log to the console and a file
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});
app.use((req, res, next) => {
  // Log an info message for each incoming request
  logger.info(`Received a ${req.method} request for ${req.url}`);
  next();
});

app.get('/all', (req, res) => {
  res.send({light:lightState, ph:phValue})
})

app.get('/ph', (req, res) => {
  phValue = req.query.ph;
  res.send(lightState)
})

app.post('/ph', (req, res) => {
  phValue = req.body.ph;
  res.send(lightState)
})

app.post('/light', (req, res) => {
  lightState = req.body.light;
  res.send(true)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

