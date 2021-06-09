var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	app = express(); /*,
	toDos = [
		// настраиваем список задач копированием
		// содержимого из файла todos.OLD.json
	];*/
	// импортируем библиотеку mongoose
app.use(express.static(__dirname + "/client"));
// Это модель Mongoose для задач
var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [ String ]
});
var ToDo = mongoose.model("ToDo", ToDoSchema);
http.createServer(app).listen(3000);
// Этот маршрут замещает наш файл
// todos.json в примере из части 5
app.get("/todos.json", function (req, res) {
	ToDo.find({}, function (err, toDos) {
		// не забудьте о проверке на ошибки
		res.json(toDos);
	});
});
// командуем Express принять поступающие
// объекты JSON
app.use(express.urlencoded({ extended: true }));
// подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect('mongodb://localhost/Amazeriffic', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true 
	}).then(res => {
		console.log("DB Connected!")
	}).catch(err => {
		console.log(Error, err.message);
	});
app.post("/todos", function (req, res) {
	var newToDo = req.body;
	console.log(newToDo);
	toDos.push(newToDo);
	// отправляем простой объект
	res.json({"message":"Вы размещаетеся на сервере!"});
});