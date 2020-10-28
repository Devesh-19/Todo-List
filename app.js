const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.get("/", (req, res) =>
{
    const today = new Date();
    const currentDay = today.getDay();
    let day = "";

    if (currentDay === 6 || currentDay === 0)
    {
        day = "weekend";
    }
    else
    {
        day = "weekday";
    }
    res.render('list', {dayType : day});
})

app.listen(3000, () =>
{
    console.log("Server is up and running at port 3000");
})