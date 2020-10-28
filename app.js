const express = require("express");
const bodyParser = require("body-parser");

let item = "";

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.get("/", (req, res) =>
{
    const today = new Date();

    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };

    const day = today.toLocaleDateString("en-IN", options);

    res.render('list', {dayType: day, newItem: item});
});

app.post("/", (req, res) =>
{
    item = req.body.item;
    
    res.redirect("/");
});

app.listen(3000, () =>
{
    console.log("Server is up and running at port 3000");
});