const express = require("express");
const bodyParser = require("body-parser");

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


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

    res.render('list', {listTitle: day, newItems: items});
});

app.post("/", (req, res) =>
{
    let item = req.body.item;

    if (req.body.list === "Work")
    {
        workItems.push(item);    
        res.redirect("/work");
    }
    else
    {
        items.push(item);    
        res.redirect("/");
    }


});

app.get("/work", (req, res) =>
{
    res.render("list", {listTitle: "Work List", newItems: workItems});
})

app.post("/work", (req, res) =>
{
    let item = req.body.item;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000, () =>
{
    console.log("Server is up and running at port 3000");
});