var express = require('express'); 
var app = express();
var cors = require('cors');
var path = require('path');
const { addCountry, getSingleCoutry, getCoutries } = require('./controller/coutnries');

const upload = require('./multer');

app.use(express.json())
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.get('/countries', getCoutries)
app.post('/AddCountry', upload.single('flag'), addCountry);
app.get('/countries/:id', getSingleCoutry)


var server = app.listen(process.env.PORT || 8080,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})
