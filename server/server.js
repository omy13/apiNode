require('./config/config');
const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/device'));
mongoose.connect('mongodb+srv://omar:tCTyeF0I5Gprglhu@cluster0-9sngf.mongodb.net/devices',  {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(error, res)=>{
    if(error) throw error;

    console.log('funciona base de datos');
});

app.listen(process.env.PORT, ()=>{
    console.log('Escuchando puerto', process.env.PORT)
});
