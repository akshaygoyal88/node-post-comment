var mongoose = require('mongoose');

module.exports = Todo = mongoose.model('Todo', {
    text: {
        type: String,
        default: ''
    }
}),
Post = mongoose.model('Post', {
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
}),
Comment = mongoose.model('Comment', {
    text: {
        type: String,
        default: ''
    },
    post_id: {
        type: String,
        default: ''
    },
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
});