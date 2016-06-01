require('./models/models');
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

    app.get('/api/comments/:post_id', function (req, res) {
        // use mongoose to get all todos in the database
        console.log(req.params)
       Comment.find({post_id: req.params.post_id}, function (err, comments){
          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err) {
              res.send(err);
          }
          res.json(comments); // return all todos in JSON format
      });
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

    app.post('/api/comments', function (req, res) {
        console.log('req.body',req.body);
        // create a todo, information comes from AJAX request from Angular
        Comment.create({
            text: req.body.commentText,
            post_id: req.body.postID
        }, function (err, todo) {
            if (err){
              return  res.send(err);
            }
                return res.send(todo);

            // get and return all the todos after you create another
            // getPosts(res);
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
    app.put('/api/posts/:post_id', function (req, res) {
        console.log(req.body)
         // use our bear model to find the bear we want
        Post.findById(req.params.post_id, function(err, post) {

            if (err)
                res.send(err);
            
            post.title = req.body.title;

            // save the bear
            post.save(function(err) {
                if (err)
                    res.send(err);
                  getPosts(res);
                // res.json({ message: 'Todo updated!' });
            });

        });
    });
     // delete a post
    app.delete('/api/posts/:post_id', function (req, res) {
        Post.remove({
            _id: req.params.post_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
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
