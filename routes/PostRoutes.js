var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var jwt = require('express-jwt');

var auth = jwt({secret: 'catsinhats', userProperty: 'payload'});


router.param('post', function(req, res, next, id) {
	Post.find({_id: id}).populate('username').exec(function(err, posts) {
		if(err) return next(err);
		req.post = posts[0];
		next();
	});
});

router.post('/v1/api/deletePost/:post', function(req, res, next) {
	Post.update({_id : req.post._id}, {dateDeleted: new Date()}, function(err) {
		if(err) return next(err);
		else res.send("You have deleted the Post.");
	});
});

//gets all post that are not deleted
router.get('/v1/api/Post', function(req, res, next) {
	var query = Post.find({dateDeleted: null});
	query.exec(function(err, posts) {
		if(err) return next(err);
		res.json(posts);
	});
});

//gets a single post
router.get('/v1/api/Post/:post', function(req, res, next) {
	res.send(req.post);
});

router.post('/v1/api/Post', function(req, res, next) {
	var createdPost = new Post(req.body);
	createdPost.dateCreated = new Date();
	createdPost.save(function(err, post) {
		if(err) return next(err);
		res.send({id: post._id});
	});
});

router.use(function(err, req, res, next) {
	res.status(400).send(err);
});

module.exports = router;