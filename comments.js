// Create web server
// 1. Create express app
// 2. Create router
// 3. Create api
// 4. Create a comment
// 5. Get all comments
// 6. Get a comment
// 7. Update a comment
// 8. Delete a comment

// 1. Create express app
const express = require('express');
const app = express();
app.use(express.json());

// 2. Create router
const router = express.Router();

// 3. Create api
app.use('/api', router);

// 4. Create a comment
let comments = [
    {id: 1, author: 'John', message: 'Hello'},
    {id: 2, author: 'Jane', message: 'Hi'}
];

router.post('/comments', (req, res) => {
    let comment = req.body;
    comments.push(comment);
    res.status(201).send(comment);
});

// 5. Get all comments
router.get('/comments', (req, res) => {
    res.status(200).send(comments);
});

// 6. Get a comment
router.get('/comments/:id', (req, res) => {
    let comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');
    res.status(200).send(comment);
});

// 7. Update a comment
router.put('/comments/:id', (req, res) => {
    let comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');
    comment.author = req.body.author;
    comment.message = req.body.message;
    res.status(200).send(comment);
});

// 8. Delete a comment
router.delete('/comments/:id', (req, res) => {
    let comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');
    let index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.status(200).send(comment);
});

app.listen(3000, () => console.log('Server is running...'));