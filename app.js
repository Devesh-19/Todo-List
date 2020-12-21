const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const _ = require("lodash");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const itemSchema = {
	name: String,
};

const Item = mongoose.model("Item", itemSchema);

const listSchema = {
	name: String,
	items: [itemSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
	res.redirect("/Today");
});

app.post("/", (req, res) => {
	const newItem = req.body.item;
	const listName = req.body.list;

	const newListItem = new Item({
		name: newItem,
	});
	List.findOne({ name: listName }, (err, foundList) => {
		foundList.items.push(newListItem);
		foundList.save();
		res.redirect(`/${listName}`);
	});
});

app.get("/delete/:listName/:id", (req, res) => {
	const delItemId = req.params.id;
	const listName = req.params.listName;

	List.updateOne(
		{ name: listName },
		{ $pull: { items: { _id: delItemId } } },
		(err, results) => {
			if (err) {
				console.log(err);
			}
		}
	);
	res.redirect(`/${listName}`);
});

app.get("/:customListName", (req, res) => {
	const customListName = _.capitalize(req.params.customListName);

	List.findOne({ name: customListName }, (err, foundList) => {
		if (!err) {
			if (!foundList) {
				// Create new list
				const list = new List({
					name: customListName,
				});
				list.save();

				res.redirect(`/${customListName}`);
			} else {
				// Show an existing list
				res.render("list", {
					listTitle: foundList.name,
					newItems: foundList.items,
				});
			}
		}
	});
});

let port = process.env.PORT;
if (port == null || port == "") {
	port = 3000;
}

app.listen(port, () => {
	console.log("Server has started successfully!");
});
