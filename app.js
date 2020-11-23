const express = require("express");
const bodyParser = require("body-parser");
const date = require(`${__dirname}/date.js`)
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const itemSchema = {
	name: String
};

const Item = mongoose.model("Item", itemSchema);

const buyFood = new Item (
	{
		name: "Buy Food"
	}
);

const cookFood = new Item (
	{
		name: "Cook Food"
	}
);

const eatFood = new Item (
	{
		name: "Eat Food"
	}
);

const defaultItems = [buyFood, cookFood, eatFood];


app.get("/", function(req, res) {

	Item.find((err, results) =>
	{
		if (err)
		{
			console.log(err);
		}
		else
		{
            if (results.length === 0)
            {
                Item.insertMany(defaultItems, err =>
                    {
                        if (err)
                        {
                            console.log(err);
                        }
                    })
                res.redirect("/");
                
            }
            else
            {
                const day = date.getDate();
                res.render("list", {listTitle: day, newItems: results});
            }
            
		}
	})
});

app.post("/", (req, res) =>
{
    const newItem = req.body.item;

    const newListItem = new Item (
        {
            name: newItem
        }
    )

    newListItem.save();
    res.redirect("/");
});

app.post("/delete", (req, res) =>
{
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, err =>
        {
            if (!err)
            {
                res.redirect("/");
            }
        })
})

app.get("/work", (req, res) =>
{
    res.render("list", {listTitle: "Work List", newItems: workItems});
})

app.post("/work", (req, res) =>
{
    const item = req.body.item;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000, () =>
{
    console.log("Server is up and running at port 3000");
});