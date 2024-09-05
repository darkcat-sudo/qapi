
const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
const PORT = 5000
//start our server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);    
});



app.get('/', (req, res) => {
 res.send("hello from express")
});

const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('stube/json/videodata.json', 'utf-8'));

app.get('/vdata/:id', (req,res) =>{
  const sec = req.params.id
  const specificData = jsonData.find(item => item.videoid === sec) 
  if (specificData) {
    res.json(specificData);
  } else {
    res.status(404).json({ error: 'Object not found' });
  }
});




app.get('/vdata', (req, res) => {
    res.json(jsonData);
});


app.get('/vdata/s/:title', (req, res) => {
  const sec = req.params.title.toLowerCase();  // Convert to lowercase to make search case-insensitive
  const specificData = jsonData.filter(item => item.title.toLowerCase().includes(sec));

  if (specificData.length > 0) {
    res.json(specificData);
  } else {
    res.status(404).json({ error: 'Object not found' });
  }
});