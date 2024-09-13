
var path = require('path');
const fs = require("fs")

const dataPath = path.join(__dirname , "../" , "data.json")

const addCountry = (req, res) => {
    let newCountry = JSON.parse(req.body.country); 

    if (req.file) {
  
        
        let countryName = newCountry.name.toLowerCase();
        let extension = path.extname(req.file.originalname);
        let newFileName = countryName + extension;

        
        let oldFilePath = path.join(__dirname, "../", '/images', req.file.filename);
        let newFilePath = path.join(__dirname, "../", '/images', newFileName);

        if (fs.existsSync(newFilePath)) {
            fs.unlinkSync(newFilePath); 
        }

        fs.renameSync(oldFilePath, newFilePath); 
        newCountry.flag = '/images/' + newFileName; 
    }

    fs.readFile(dataPath, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading data file');
        }

        let countriesData = JSON.parse(data);
        if (!countriesData["countries"]) {
            countriesData["countries"] = [];
        }
        let existingCountry = countriesData["countries"].find(c => c.name.toLowerCase() === newCountry.name.toLowerCase() || c.rank === newCountry.rank);

        if (existingCountry) {
            return res.status(400).send('Country with the same name or rank already exists');
        }

        countriesData["countries"].push(newCountry);
        fs.writeFile(dataPath, JSON.stringify(countriesData, null, 2), 'utf8', function (err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Error saving data');
            }
            // res.json(countriesData);
            res.json(countriesData["countries"].map(obj=>({name:obj.name,id:obj.rank})));
        });
    });
}


const getSingleCoutry = (req, res) => {

    let countryId = parseInt(req.params.id);
    
    fs.readFile(dataPath, 'utf8', function (err, data) {
       var countriesData = JSON.parse( data );
   
    
    let singleCountry = countriesData["countries"].find(obj=>obj.rank==countryId)
    if (!singleCountry) {
        return res.status(404).send('Country not found');
    }
    singleCountry.flag = `http://localhost:8080/images/${path.basename(singleCountry.flag)}`; 
       res.end(JSON.stringify(singleCountry));
    });
 }


 const getCoutries = (req, res) => {
    fs.readFile(dataPath, 'utf8', function(err, data){
        res.end(JSON.stringify(JSON.parse(data)["countries"].map(obj=>({name:obj.name,id:obj.rank})))); 
    });
}

module.exports = { getSingleCoutry, addCountry, getCoutries }