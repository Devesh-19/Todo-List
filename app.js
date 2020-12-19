const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB", {
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
	Item.find((err, results) => {
		if (err) {
			console.log(err);
		} else {
			const day = date.getDate();
			res.render("list", { listTitle: "Today", newItems: results });
		}
	});
});

app.post("/", (req, res) => {
	const newItem = req.body.item;

	const newListItem = new Item({
		name: newItem,
	});

	newListItem.save();
	res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
	const delItemId = req.params.id;
	Item.findByIdAndRemove(delItemId, (err) => {
		if (!err) {
			res.redirect("/");
		}
	});
});

app.get("/:customListName", (req, res) => {
	const customListName = req.params.customListName;

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

app.listen(3000, () => {
	console.log("Server is up and running at port 3000");
});
