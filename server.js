const express = require("express");
const path = require('path'); //a node native module
const {Item, Restaurant} = require('./models/index');

const app = express();
const port = 3000;

//Q: What does express.static help us do?
//Q: What do you think path.join helps us do?
app.use(express.static(path.join(__dirname, 'public')))

//will add routes
// 1)client makes a request -> request URL -> URL -> http request -> http response

//will add routes
app.get('/items', async (req, res) => {
    //goes into the database and looks for all Items
    const allItems = await Item.findAll()
    //server will respond with all the items found in the database
    res.json(allItems)
})

app.get('/randomItem', async (req, res) => {
    const randomNum = Math.floor(Math.random() * 3)
    const randomItem = await Item.findByPk(randomNum)

    res.json(randomItem)
})

//flip coin
app.get('/flip', (req,res) => {
    const mycoin = (Math.floor(Math.random() * 8)  === 0)
    if(mycoin) res.send('Heads')
    else res.send('Tails')
   })
   
   app.get('/myrestaurants', async (req, res) => {
       const allRestaurants = await Restaurant.findAll()
       res.json(allRestaurants)
   })

//Q: What will our server be doing?
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
