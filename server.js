const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.post('/todo', function (req, res) {
    saveTodoInFile(req.body, function (err) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send("success");
    });
});
app.get('/todo-data', function (req, res) {
    readAllTodos(function (err, data) {
        if (err) {
            res.status(500).send("error");
            return;
        }
        // res.status(200).json(data);
        res.status(200).send(JSON.stringify(data));
    });
});
app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/about.html');
});
app.get('/contact', function (req, res) {
    res.sendFile(__dirname + '/contact.html');
});
app.get('/todo', function (req, res) {
    res.sendFile(__dirname + '/todo.html');
});
app.get('/todoScript.js', function (req, res) {
    res.sendFile(__dirname + '/todoScript.js');
});
app.get('/cross.png', function (req, res) {
    res.sendFile(__dirname + '/cross.png');
});

function readAllTodos(callback) {
    fs.readFile('./todoStore.txt', 'utf-8', function (err, data) {
        if (err) {
            callback(err);
            return;
        }
        if (data.length === 0) {
            data = "[]";
        }
        try {
            data = JSON.parse(data);
            callback(null, data);
        } catch (err) {
            callback(err);
        }
    });
}
function saveTodoInFile(todo, callback) {
    readAllTodos(function (err, data) {
        if (err) {
            callback(err);
            return;
        }
        data.push(todo);
        fs.writeFile('./todoStore.txt', JSON.stringify(data), function (err) {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
    })
}