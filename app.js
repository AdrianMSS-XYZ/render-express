const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

let lightState = 'off';
let phValue = '';

app.use(express.static('public'));
app.use(express.json());

app.get('/all', (req, res) => {
  res.send({light:lightState, ph:phValue})
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

