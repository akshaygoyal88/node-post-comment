var Todo = require('./models/todo');
var path = require('path');
function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};
function getPosts(res) {
    Post.find(function (err, posts) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(posts); // return all todos in JSON format
    });
};
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/posts', function (req, res) {
        // use mongoose to get all todos in the database
        getPosts(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });
    app.post('/api/posts', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Post.create({
            title: req.body.title
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getPosts(res);
        });

    });

    // update todo and send back all todos after update
    app.put('/api/todos/:todo_id', function (req, res) {
        console.log(req.body)
         // use our bear model to find the bear we want
        Todo.findById(req.params.todo_id, function(err, todo) {

            if (err)
                res.send(err);
            
            todo.text = req.body.text;

            // save the bear
            todo.save(function(err) {
                if (err)
                    res.send(err);
                  getTodos(res);
                // res.json({ message: 'Todo updated!' });
            });

        });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });
    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
};